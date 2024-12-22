import React, { useState, useEffect } from 'react'
import {
    Container,
    Button,
    StyledFileInput,
    CenteredText,
} from '../styles/AppStyles'
import ResumeDetails from '../components/ResumeDetails'
import { handleDownload, handleUpload } from '../utils/api';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model_ani from '../components/Model_ani';

const Home: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [includeCoverLetter, setIncludeCoverLetter] = useState<boolean>(true);
    const [editableContent, setEditableContent] = useState<any>({
        coverLetter: '',
        name: '',
        location: '',
        phone: '',
        email: '',
        summary: '',
        skills: [],
        workHistory: [],
        education: [],
    });

    useEffect(() => {
        if (response) {
            setEditableContent({
                coverLetter: response.coverLetter || '',
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
    }, [response]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    // const handleContentChange = (field: string, value: any) => {
    //     setEditableContent((prev: any) => ({ ...prev, [field]: value }));
    // };

    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px' }}>
                {/* Left Section */}
                <div style={{ flex: 1 }}>
                    <CenteredText>
                        Upload Your Resume to <br /> Make it more Polished
                    </CenteredText>
                    <div className="upload-section">
                        <StyledFileInput type="file" accept="application/pdf" onChange={handleFileChange} />
                        <Button onClick={() => handleUpload(file, setResponse)}>Upload and Display</Button>
                    </div>
                    {response && (
                        <ResumeDetails
                            response={response}
                            includeCoverLetter={includeCoverLetter}
                            setIncludeCoverLetter={setIncludeCoverLetter}
                            editableContent={editableContent}
                            handleDownload={handleDownload}
                        />
                    )}
                </div>

                {/* Right Section (Canvas) */}
                <div style={{ flex: 1 }}>
                    <Canvas
                        camera={{ position: [3, 0, 15], fov: 8 }}
                        style={{
                            width: '100%',
                            height: '500px',
                        }}
                    >
                        <ambientLight intensity={2.0} />
                        <ambientLight intensity={0.1} />
                        <directionalLight intensity={0.8} />
                        <Model_ani position={[0.025, -0.9, 0]} />
                        <OrbitControls />
                    </Canvas>
                </div>
            </div>
        </Container>
    );
};

export default Home;
