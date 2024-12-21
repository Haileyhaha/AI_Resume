import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

export const handleUpload = async (file: File | null, setResponse:React.Dispatch<React.SetStateAction<any>> )=>{
    if(!file){
        alert('Please select a file to upload')
        return;
    }
    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`,{});
        setResponse(res.data);
    }catch(error){
        console.error('Error upload file:', error)
        setResponse({error:'Error processing the document'})
    }
}
export const handleDownload = async(editableContent:any, includeCoverLetter: boolean) =>{
    try{
        const resumeElement = document.getElementById('resume-content')
        if(!resumeElement){
            alert('Resume content not found');
            return;
        }
        const canvas = await html2canvas(resumeElement,{scale:2})
        const imgData = canvas.toDataURL('/image/png');
        const pdf = new jsPDF('p','mm','a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

        if(includeCoverLetter && editableContent.coverLetter && editableContent.coverLetter.length > 0){
            pdf.text(editableContent.coverLetter, 10, pdf.internal.pageSize.getHeight() - 20)
        }
        const pdfBlob = pdf.output('blob')
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = 'resume.pdf';
        link.click();

        //saving backend
        const formData = new FormData();
        formData.append('resume', pdfBlob)
        formData.append('data', JSON.stringify(editableContent));

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/save-resume`, formData);
        alert('Resume saved successfully');

    }catch(error){
        console.error('Error downloading PDF:', error);
        alert('Error generating PDF.')
    }
}