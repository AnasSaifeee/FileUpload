import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import './styles.css';

interface FileInfo {
  fileName: string;
  blob: Blob;
}

const FileUpload: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STORE INFORMATION ABOUT SELECTED FILES
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFileInfo = Array.from(files).map((file) => {
        const blob = new Blob([file], { type: file.type });
        return {
          fileName: file.name,
          blob: blob,
        };
      });
      setFileInfo(newFileInfo);
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

  return (
    <>
      <div className='fileUploadContainer'>
        <div className="drag-drop" onClick={handleOverlayClick}>
          <input
            ref={fileInputRef}
            className="image-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            multiple
          />

          {fileInfo.length ? (
            <div className="overlay">
              {fileInfo.map((file, index) => (
                <div key={index} className='fileInfoContainer'>
                  <div>{file.fileName}</div>
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
              <span style={{ textDecoration: 'none', color: '#3E93D6' }}>
                Click to browse
              </span>
              <br />
              <br />
              All .csv, .doc and .docx file types are supported
            </div>
          )}
        </div>
        <Button disabled={fileInfo.length===0} variant='contained' className='fileUploadButton'>Upload</Button>
      </div>
    </>
  );
};

export default FileUpload;
