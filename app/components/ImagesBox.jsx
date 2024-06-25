import React, { useState } from 'react';
import Camera from '../components/Camera';

const Home = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  const handleCapture = (imageData) => {
    const newImages = [...images];
    newImages[selectedBox] = imageData;
    setImages(newImages);
    setSelectedBox(null);
  };

  const handleCloseCamera = () => {
    setSelectedBox(null);
  };

  return (
    <div>
      <h1>Camera Capture in Image Boxes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((image, index) => (
          <div 
            key={index} 
            onClick={() => handleBoxClick(index)} 
            style={{ width: '200px', height: '200px', border: '2px solid black', cursor: 'pointer' }}
          >
            {image ? (
              <img src={image} alt={`Capture ${index + 1}`} style={{ width: '100%', height: '100%' }} />
            ) : (
              <p style={{ textAlign: 'center', lineHeight: '200px' }}>Click to open camera</p>
            )}
          </div>
        ))}
      </div>
      {selectedBox !== null && <Camera onCapture={handleCapture} onClose={handleCloseCamera} />}
    </div>
  );
};

export default Home;
