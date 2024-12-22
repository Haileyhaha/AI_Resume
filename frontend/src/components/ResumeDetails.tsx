import React, { useState } from "react";
import { 
    ResumeContainer,
    CheckboxContainer,
    SectionTitle,
    CenteredText,
    Button,
    SkillsList,
    WorkHistoryList,
    WorkResponsibilities,
} from "../styles/AppStyles"
import Toolbar from "./Toolbar";


interface ResumeContatinerProps{
    response:any;
    includeCoverLetter: boolean;
    setIncludeCoverLetter : (value: boolean) => void;
    editableContent : any;
    handleDownload : (content:any, includeCoverLetter: boolean) => void;
}

const ResumeDetails: React.FC<ResumeContatinerProps> = ({
    response,
    includeCoverLetter,
    setIncludeCoverLetter,
    editableContent ,
    handleDownload,
}) => {
    console.log(response)

    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({top:0 , left:0})
    const [selectedText, setSelectedText] = useState<string | null>(null);

    const handleSelection= () =>{
        const selection = window.getSelection();
        if(selection && selection.toString().trim()){
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            setSelectedText(selection.toString());
            setToolbarPosition({top: rect.top + window.scrollY-40, left:rect.left + rect.width/2})
            setToolbarVisible(true)
        }else{
            setToolbarVisible(false);
        }
    }

    const changeTextColor = (color : string)=>{
        if(selectedText){
            const content =  document.getElementById('resume-content')
            if(content){
                content.innerHTML = content.innerHTML.replace(
                    new RegExp(selectedText,  'g'),
                    `<span style="color: ${color};"><${selectedText}/span>`
                );
            }
        }
        setToolbarVisible(false);
    }

    const changeFontSize = (size : string)=>{
        if(selectedText){
            const content =  document.getElementById('resume-content')
            if(content){
                content.innerHTML = content.innerHTML.replace(
                    new RegExp(selectedText,  'g'),
                    `<span style="font-size: ${size};"><${selectedText}/span>`
                );
            }
        }
        setToolbarVisible(false);
    }

  return (
    <ResumeContainer id = 'resume-container' onMouseUp={handleSelection}>
        <div id='resume-content'>
            {includeCoverLetter && (
                <>
                    <SectionTitle>Cover Letter</SectionTitle>
                    <p>{response.coverLetter}</p>
                </>
            )}
            <CenteredText>Resume</CenteredText>
            <h2>{response.name}</h2>
            <p>{response.location} | {response.phone} | {response.email}</p>

            <SectionTitle>Proffesional Summary</SectionTitle>
            <p>{response.summay}</p>
            
            <SectionTitle>Skills</SectionTitle>
            <SkillsList>
                {response.skills.map((skill:string, index:number)=>(
                    <li key={index}>{skill}</li>
                ))}
            </SkillsList>
            
            <SectionTitle>Work History</SectionTitle>
            <WorkHistoryList>
                {response.workHistory.map((job:any, index: number)=>(
                    <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.company}| {job.location} | {job.startDate} -{" "}{job.endDate}</p>
                        <WorkResponsibilities>
                            {job.responsibilities.map((responsibility:string , index: number)=>(
                                <p key={index}>{responsibility}</p>
                            ))}
                        </WorkResponsibilities>
                    </li>
                ))}
            </WorkHistoryList>
            <SectionTitle>Education</SectionTitle>
            {response.education.map((school:any, index:number)=>(
                <div key={index}>
                    <h3>{school.degree}</h3>
                    <p>{school.school}|{school.location}|{school.startDate}-{" "}{school.endDate}</p>
                </div>
            ))}
            <SectionTitle>Analysis</SectionTitle>
            <p>{response.analysis}</p>
        </div>
        <Toolbar
            toolbarVisible = {toolbarVisible}
            toolbarPosition={toolbarPosition}
            changeTextColor={changeTextColor}
            changeFontSize={changeFontSize}
        />
        <CheckboxContainer>
            <input
                type='checkbox'
                id='include-cover-letter'
                checked={includeCoverLetter}
                onChange={()=>setIncludeCoverLetter(!includeCoverLetter)}
            />
            <label htmlFor="include-cover-letter">Include Cover Letter</label>
            <Button onClick={() => handleDownload(editableContent,includeCoverLetter)}>
                DownLoad Resume
            </Button>
        </CheckboxContainer>
    </ResumeContainer>
  )
}

export default ResumeDetails