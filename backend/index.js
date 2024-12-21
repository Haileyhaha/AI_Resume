import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import pdfkit from 'pdfkit';
import sequelize from './config/database.js'
import resumeHistoryRoute from './routes/resumeHistoryRoute.js'
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest : 'uploads/'});

const PORT = process.env.PORT || 5000;

if(!process.env.GEMINI_API_KEY){
    console.error('GEMINI API KEY is missing in the .env')
    process.exit(1)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

sequelize.sync({alter:true})
    .then(()=>console.log('Database Synchronized!'))
    .catch((error)=>console.error('Error syncing database:' , error));

const generatePDF = (content, filePath) =>{
    return new Promise((resolve, reject)=>{
        const doc= new pdfkit();
        const writeStream = fs.createWriteStream(filePath)
        
        doc.pipe(writeStream)
        doc.fontSize(12).text(content, {align:'left'})
        doc.end(); 

        writeStream.on('finish', ()=>{
            resolve(filePath);
        });
        writeStream.on('error',(error)=>{
            reject(error);
        })
    })

}

app.post('/upload', upload.single('file'), async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:'file is required'})
        }

        const file = req.file;
        if(file.mimetype !== 'application/pdf'){
            return res.status(400).json({message:'only pdf files are allowed.'})
        }

        const filePath = path.resolve('uploads', file.filename)
        const uploadResponse =  await fileManager.uploadFile(filePath,{
            mimetype:file.mimetype,
            displayName: file.originalName,
        })
    
    
    const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'})
    const resumeAnalysis = await model.generateContent([
        {
            fileData : {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
            },
        },
        {text: 'extract details and suggest improvement for this resume.'}
    ])

    const improvedContent = resumeAnalysis.response.text;
    const coverLetter = await model.generateContent([
        {text: 'create a professional cover letter based on this resume'}
    ])

    fs.unlinkSync(filePath)

    res.status(200).json({
        analysis: improvedContent,
        resume : improvedContent,
        coverLetter: coverLetter.response.text,
    })
    }catch(error){
        if(req.file) fs.unlinkSync(req.file.path)
            res.status(500).json({message: error.message || 'ERROR processing the document.'})
    }
    })

app.post('/download', async(req,res)=>{
    const {resumeContent, coverLetterContent, includeCoverLetter} = req.body;
    const filePath = path.resolve('downloads', `resume-${Date.now()}.pdf`)
    const fullContent = includeCoverLetter? 
    `${resumeContent}\n\n--\n\n${coverLetterContent}`
    : resumeContent;
    try{
        await generatePDF(fullContent, filePath)
        res.download(filePath, ()=>{
            fs.unlinkSync(filePath)
        })
    }catch(error){
        res.status(500).json({error: 'Error generating PDF', error})
    }
})

app.use('/', resumeHistoryRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})