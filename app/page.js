'use client'
import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'
// import Map from './components/Map';
import dynamic from 'next/dynamic'
const Map = dynamic(()=> import ('./components/Map'),{ssr:false})
function Page() {
  const [details, setDetails] = useState([
    { image: '', latitude: '', longitude: '', direction: 'east' },
    { image: '', latitude: '', longitude: '', direction: 'west' },
    { image: '', latitude: '', longitude: '', direction: 'north' },
    { image: '', latitude: '', longitude: '', direction: 'south' }
  ]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const webcamRef = useRef(null);
  const [showMap,setShowMap] = useState(true)
  const [mapdetails,setMapDetilas] = useState([])

  // useEffect(() => {
    
  // },[mapdetails])

  const handleCamera = (index) => {
    setActiveIndex(index);
    setCameraOpen(true);
  }

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    let latitude = '';
    let longitude = '';

    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }

    setDetails(prevDetails => {
      const newDetails = [...prevDetails];
      newDetails[activeIndex].image = imageSrc;
      newDetails[activeIndex].latitude = latitude;
      newDetails[activeIndex].longitude = longitude;
      // newDetails[activeIndex].direction = details[activeIndex].direction;
      return newDetails;
    });

    try {
      const userLocation = {
        image: imageSrc,
        latitude: latitude,
        longitude: longitude,
        // direction : details.direction
      };
      console.log(userLocation)
      const res = await fetch('/api/postit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLocation)
      });

      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
    setCameraOpen(false);
    setActiveIndex(null);
  }

  const handleMap = async () => {
    try {
      const res = await fetch('/api/getit', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error(`An error occurred: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data.data);
      setMapDetilas(data.data)
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setShowMap(!showMap)
  };
  
  return (
    <div className='flex flex-col items-center mt-2'>
      <div className='flex flex-col justify-center items-center'>
      <div className='gap-2 justify-center flex-wrap items-center grid grid-cols-2'>
        {details.map((detail, index) => (
          <div
            key={index}
            className='w-[5rem] h-[5rem] border-2 border-black cursor-pointer'
            onClick={() => handleCamera(index)}
          >
            {detail.image && <img src={detail.image} alt="Captured" className='w-full h-full object-cover' />}
          </div>
        ))}
      </div>
        <br></br><button onClick={() => handleMap()} className='w-[100px] h-[40px] bg-blue-600 rounded-[10px] text-white'>Get Map</button>
      </div>
      {cameraOpen && (
        <div className='flex flex-col items-center'>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className='mt-2'
          />
          <button onClick={capturePhoto} className='mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer'>
            Capture Photo
          </button>
        </div>
      )}
      {console.log(showMap)}
      {
        showMap ?  <></> : <Map coordinates={mapdetails}/>      
      }
    </div>
  )
}

export default Page;
