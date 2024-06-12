import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import {toast} from 'react-toastify'
import './styles.css';

const FileUpload: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STORE INFORMATION ABOUT SELECTED FILES
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handle file change called");
    const files = event.target.files;
    if (files) {
      setFileInfo(Array.from(files));
      // Reset the input value to allow the same file to be selected again
      event.target.value = '';
    }
  };

  // HANDLE CANCEL FILE ACTION
  const handleCancelFile = (index: number) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setFileInfo((prevFileInfo) => prevFileInfo.filter((_, i) => i !== index));
  };

  // HANDLE OVERLAY CLICK
  const handleOverlayClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = async () => {
    if (fileInfo.length === 0) {
      console.error('No files selected for upload.');
      return;
    }

    const formData = new FormData();
    fileInfo.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('http://3.16.135.123:9999/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response is:", response.data);
      if(response.data.includes("No"))
        {
          toast.warn("No Passwords Detected")
        }
      else
      {
        toast.success("Passwords Detected")
      }
    } catch (error) {
      console.error('There was a problem with the upload operation:', error);
    }
  };


// useEffect(()=>{
//   toast.success("passwords detected")
//   toast.warning("sjbsb")
// },[])
  return (
    <>
      <div className='fileUploadContainer'>
        <div className="drag-drop" >
          <input
            ref={fileInputRef}
            className="image-input"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            multiple
          />

          {fileInfo.length ? (
            <div className="overlay">
              {fileInfo.map((file, index) => (
                <div key={index} className='fileInfoContainer'>
                  <div>{file.name}</div>
                  <div
                    className='cancelIcon'
                    onClick={handleCancelFile(index)}
                  >
                    <CancelIcon />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overlay">
              Drag file here or{' '}
              <span style={{ textDecoration: 'none', color: '#3E93D6' }} onClick={handleOverlayClick}>
                Click to browse
              </span>
              <br />
              <br />
              All .csv, .doc and .docx file types are supported
            </div>
          )}
        </div>
        <Button disabled={fileInfo.length === 0} onClick={uploadFile} variant='contained' className={fileInfo.length === 0 ? 'disabled' : 'fileUploadButton'}>
          Upload
        </Button>
      </div>
    </>
  );
};

export default FileUpload;
