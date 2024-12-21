import React, {useState, useEffect} from 'react'
import {
    Container,
    Button,
    StyledFileInput,
    ResumeContainer,
    CenteredText,
    CheckboxContainer,
    SectionTitle,
} from '../styles/AppStyles'
import ResumeDetails from '../components/ResumeDetails'
import { handleDownload, handleUpload } from '../utils/api';


const Home:React.FC = () => {
    const [file,setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [includeCoverLetter, setIncludeCoverLetter] = useState<boolean>(true);
    const [editableContent, setEditableContent] = useState<any>({
        coverLetter:'',
        name: '',
        location:'',
        phone:'',
        email:'',
        summary:'',
        skills:[],
        workHistory:[],
        education:[],
    });
    useEffect(()=>{
        if (response){
            setEditableContent({
                coverLetter:response.coverLetter || '',
                name: response.name || '',
                location: response.location || '',
                phone: response.phone || '',
                email: response.email || '',
                summary: response.summary || '',
                skills: response.skills || [],
                workHistory: response.workHistory || [],
                education: response.education || [],
            });
        }
    }, [response])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    }

    const handleContentChange = (field:string, value:any)=>{
        setEditableContent((prev: any)=>({...prev, [field]:value}))
    }

    return (
        <Container>
            <CenteredText>
                Upload Your Resume to <br/> Make it more Polished
            </CenteredText>
            <div className='upload-section'>
                <StyledFileInput type='file' accept='application/pdf' onChange={handleFileChange}/>
                <Button onClick={()=> handleUpload(file,setResponse)}>Upload and Display</Button>
            </div>
            {response && (
                <ResumeDetails 
                    response = {response}
                    includeCoverLetter = {includeCoverLetter}
                    setIncludeCoverLetter = {setIncludeCoverLetter}
                    editableContent= {editableContent}
                    handleDownload = {handleDownload}
                />
            )}
        </Container>
  )
}

export default Home
