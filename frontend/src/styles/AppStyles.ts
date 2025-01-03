import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 10px; /* Slight curve on the corners */
  cursor: pointer;
  margin: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledFileInput = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 2px dashed #007bff;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: center;
  cursor: pointer;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: 'Choose a file';
    display: inline-block;
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    margin-right: 10px;
  }

  &:hover::before {
    background: #0056b3;
  }
`;

export const ResumeContainer = styled.div`
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const SectionTitle = styled.h3`
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;


export const CenteredText = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: #333;
  font-size: 2.0rem; /* Increased size for a more prominent look */
  font-family: 'Pacifico', cursive; /* Added a more artistic font family */
  line-height: 1.3;
  letter-spacing: 1px;
`;

export const CheckboxContainer = styled.div`
  margin: 10px 0;
`;

export const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
`;

export const FileInput = styled.input`

  display: block;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 2px dashed #007bff;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: center;
  cursor: pointer;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: 'Choose a file';
    display: inline-block;
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    margin-right: 10px;
  }

  &:hover::before {
    background: #0056b3;
  }
`;
export const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 5;
  margin: 0;
`;

export const WorkHistoryList = styled.div`
  margin-bottom: 20px;
`;

export const WorkResponsibilities = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style: disc;
`;


// Updated FloatingToolbar component
export const FloatingToolbar = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  gap: 10px;
  z-index: 1000;
  top: ${({ style }) => style?.top || 0}px;
  left: ${({ style }) => style?.left || 0}px;
`;

// Updated ToolbarButton component
export const ToolbarButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;