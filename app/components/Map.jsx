// 'use client'
// import 'leaflet/dist/leaflet.css';
// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';

// // Custom icon for the markers
// const customIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41]
// });

// function Map({ coordinates }) {
//   console.log(coordinates);
//   return (
//     <section className='w-[100%] flex justify-center items-center'>
//       <MapContainer center={[17.4486, 78.3908]} zoom={10} className='h-[50vh] w-[90%] mt-4'>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {coordinates.map((coord, index) => {
//           // console.log(coord.latitude)
//           return  <LocationMarker
//             key={index}
//             position={[coord.latitude, coord.longitude]}
//             // location={coord.location}
//             direction={coord.direction}
//           />
//         })}
//       </MapContainer>
//     </section>
//   );
// }

// function LocationMarker({ position, location, direction }) {
//   const map = useMap();

//   const handleClick = () => {
//     map.setView(position, 15); // Zoom level 15, adjust as necessary
//   };

//   return (
//     <Marker
//       position={position}
//       icon={customIcon}
//       eventHandlers={{
//         click: handleClick,
//       }}
//     >
//       <Popup>
//         {direction}
//       </Popup>
//     </Marker>
//   );
// }

// export default Map;
'use client';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// let coordinates = [{latitude:17.4486,longitude:78.3908,direction:'East'},
// {latitude:17.4401,longitude:'78.3489',direction:'West'},
// {latitude:17.4435,longitude:'78.3772',direction:'North'}]

function Map({coordinates}) {
  useEffect(() => {
    console.log('Coordinates updated:', coordinates); // Debug: Check the coordinates being passed
  }, [coordinates]);

  return (
    <section className='w-[100%] flex justify-center items-center'>
      <MapContainer center={[17.4486, 78.3908]} zoom={10} className='h-[50vh] w-[90%] mt-4'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coo, index) => (
          coo.latitude && coo.longitude ? (
            <Marker
              key={index}
              position={[coo.latitude, coo.longitude]}
              icon={customIcon}
            >
              <Popup>{coo.direction}</Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </section>
  );
}

export default Map;
