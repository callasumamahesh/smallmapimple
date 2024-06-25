'use client'
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function Map({ coordinates }) {
  console.log('Good',coordinates)
  return (
    <section className='w-[100%] flex justify-center items-center'>
      <MapContainer center={[17.4486, 78.3908]} zoom={10} className='h-[50vh] w-1/2 mt-4'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {coordinates.map((coord, index) => {
          return  <LocationMarker
          key={index}
          position={[coord.latitude, coord.longitude]}
          location={coord.location}
        />
        })}
      </MapContainer>
    </section>
  );
}

function LocationMarker({ position, location }) {
  const map = useMap();

  const handleClick = () => {
    map.setView(position, 15); // Zoom level 15, adjust as necessary
  };

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        {location}
      </Popup>
    </Marker>
  );
}

export default Map;
