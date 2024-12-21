import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    HistoryContainer,
    ResumesGrid,
    ResumeCard,
    ResumeCardContainer,
    ResumeTitle,
    ResumeEmail,
    ViewButton,
    EllipsisIcon,
    DeleteIcon,
 } from '../styles/HistoryStyles';

const History:React.FC= () => {
    const [resumes, setResumes] =useState<any[]>([]);
    const [activeResume, setActiveResume] = useState<number|null>(null);
    
    useEffect(()=>{
        const fetchResumes = async()=>{
            try{
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-resume`);
                setResumes(res.data.resume);
            }catch(error){
                console.error('Failed to fetch resumes', error)
                toast.error('Failed to fetch resumes');
            }
        }
        fetchResumes();
    },[])

    const viewPDF = (filePath :string) => {
        const pdfUrl = `${import.meta.env.VITE_BACKEND_URL}/view-resume?filePath=${encodeURIComponent}`
        window.open(pdfUrl, '_blank');
    }

    const deleteResume = async(id :number)=>{
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-resume/${id}`)
            setResumes(resumes.filter((resume)=> resume.id !== id))
            toast.success('Resume is deleted', {
                position: 'top-center',
                autoClose:5000,
                hideProgressBar: true,
                closeButton: true,
                style:{
                    fontSize: '0.8rem',
                },
            })
        } catch(error){
            console.error('Failed to delete resume', error)
            toast.error('Failed to delete resume')
        }
    }

    const toggleDeleteIcon = (id:number)=>{
        setActiveResume( activeResume == id ? null : id);
    }

  return (
    <HistoryContainer>
        <h1>Resume History</h1>
        {resumes.length===0?(
            <p>No resumes found.</p>
        ):(
            <ResumesGrid>
            {resumes.map((resume)=>(
                <ResumeCardContainer key={resume._id}>
                    <ResumeCard>
                        <ResumeTitle>{resume.name}</ResumeTitle>
                        <ResumeEmail>{resume.email}</ResumeEmail>
                        <ViewButton onClick={()=> viewPDF(resume.filePath)}>View</ViewButton>
                        <EllipsisIcon onClick={()=> toggleDeleteIcon(resume.id)}/>
                        {activeResume === resume.id && (
                            <DeleteIcon onClick={()=> deleteResume(resume._id)}/>
                        )}                            
                    </ResumeCard>
                </ResumeCardContainer>
            ))}
            </ResumesGrid>
        )}
        <ToastContainer/>
    </HistoryContainer>
  )
}

export default History