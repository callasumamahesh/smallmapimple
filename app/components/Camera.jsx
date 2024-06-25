import React, { useRef } from 'react';

const Camera = ({ onCapture, onClose }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onCapture(reader.result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
      <button onClick={handleOpenCamera}>Open Camera</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Camera;
