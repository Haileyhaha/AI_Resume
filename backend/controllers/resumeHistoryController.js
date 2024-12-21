import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Resume from '../models/resumeHistoryModel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../uploads');

export const saveResume = async (req, res)=>{
    try{
      if(!req.file || !req.body.data || !req.files.resume){
        return res.status(400).json({ error : 'Resume files and data are required.'})
      }
      const {resume} = req.files.resume;
      const data = JSON.parse(req.body.data);
      const resumePath = path.join(UPLOAD_DIR, `${Date.now()}_${resume.name}`);

      if(!fs.existsSync(UPLOAD_DIR)){
        fs.mkdirSync(UPLOAD_DIR,{recursive:true});
      }

      await new Promise((resolve, reject)=>{
        resume.mv(resumePath, (err)=>{
            if(err) {
                return reject(err);
            }
            resolve();
        })
      })

      //saving to db
      const saveResume  = await Resume.create({
        data,
        filePath: resumePath,
      })

      res.status(200).json({message : 'Resume saved successfully',  resume:saveResume});
    }catch(error){
        console.error('Error saving resume:', error);
        res.status(500).json({message: error.message})
    }
};

export const getResume = async (req, res) =>{
    try{
        const resume = await Resume.findAll();
        const response = resume.map((resume)=>({
            id : resume.id,
            data : resume.data,
            filePath : resume.filePath,
            createdAt : resume.createdAt
        }));
        res.status(200).json({resume})
    }catch (error){
        console.error('Error getting resume:' , error);
        res.status(500).json({message:error.message})
    }
}

export const viewResume = async (req, res)=>{
    try{
        const {id} = req.params;
        const resume = await Resume.findByPk(id);
        if(!resume){
            return res.status(404).json({message: 'Resume not found'})
        }
        res.download(resume.filePath);
    }catch(error){
        console.error('Error deleting resume: ', error);
        res.status(500).json({message: error.message})
    }
}

export const deleteResume = async (req, res)=>{
    try{
        const {id} = req.params;
        const resume = await Resume.findByPk(id);
        if(!resume){
            return res.status(404).json({message: 'Resume not found'})
        }
        await resume.destroy();
        fs.unlinkSync(resume.filePath)
        res.status(200).json({message:'Resume deleted successfully.'})
    }catch(error){
        console.error('Error deleting resume: ', error);
        res.status(500).json({message: error.message})
    }
}