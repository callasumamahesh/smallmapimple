'use client'
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

function Page() {
  const [details, setDetails] = useState([
    { image: '', latitude: '', longitude: '', direction: 'East' },
    { image: '', latitude: '', longitude: '', direction: 'West' },
    { image: '', latitude: '', longitude: '', direction: 'North'},
    { image: '', latitude: '', longitude: '', direction: 'South'},
    { image: '', latitude: '', longitude: '', direction: 'NorthEast' },
    { image: '', latitude: '', longitude: '', direction: 'NorthWest' },
    { image: '', latitude: '', longitude: '', direction: 'SouthEast' },
    { image: '', latitude: '', longitude: '', direction: 'SouthWest' }
  ]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const webcamRef = useRef(null);
  const [showMap, setShowMap] = useState(true);
  const [mapdetails, setMapDetails] = useState([]);
  const [area, setArea] = useState(0);

  const handleCamera = (index) => {
    setActiveIndex(index);
    setCameraOpen(true);
  };

  useEffect(() => {
    if (mapdetails.length > 2) {
      const calculatedArea = calculateArea(mapdetails);
      setArea(calculatedArea);
    }
  }, [mapdetails]);

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
      return newDetails;
    });

    try {
      const userLocation = {
        image: imageSrc,
        latitude: latitude,
        longitude: longitude,
        direction: details[activeIndex].direction
      };
      console.log(userLocation);
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
  };

  const calculateArea = (coordinates) => {

    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const radianCoordinates = coordinates.map(coord => ({
      lat: toRadians(coord.latitude),
      lon: toRadians(coord.longitude),
    }));

    let area = 0;

    for (let i = 0; i < radianCoordinates.length; i++) {
      const { lat: lat1, lon: lon1 } = radianCoordinates[i];
      const { lat: lat2, lon: lon2 } = radianCoordinates[(i + 1) % radianCoordinates.length];

      area += lon1 * Math.sin(lat2) - lon2 * Math.sin(lat1);
    }
    area = Math.abs((area * earthRadius * earthRadius) / 2);
    area *= 1000000;
    return area;
  };

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
      setMapDetails(data.data);
      if(data.data.length > 2){
        console.log('Good')
        const calculatedArea = calculateArea(data.data);
        setArea(calculatedArea);
      }

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setShowMap(!showMap);
  };

  return (
    <div className='flex flex-col items-center mt-2'>
      <div className='flex flex-col justify-center items-center'>
        <div className='gap-2 justify-center flex-wrap items-center grid grid-cols-4'>
          {details.map((detail, index) => (
            <div
              key={index}
              className='w-[5rem] h-[5rem] border-2 border-black cursor-pointer'
              onClick={() => handleCamera(index)}
            >
              {detail.image && <img src={detail.image} alt="Captured" className='w-full h-full object-cover' />}
              <p>{detail.direction}</p>
            </div>
          ))}
        </div>
        <br></br>
        <div className='flex gap-2'>
          <button onClick={() => handleMap()} className='w-[100px] h-[40px] bg-blue-600 rounded-[10px] text-white'>
            Get Map
          </button>
          <input type='text' placeholder='area' className='border-2 border-black-600 w-[150px] rounded-[10px] pl-4 pr-4 pt-2 pb-2' value={area} readOnly/>
        </div>
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
      {showMap ? <></> : <Map coordinates={mapdetails} />}
    </div>
  );
}

export default Page;
