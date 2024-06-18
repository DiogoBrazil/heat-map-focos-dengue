"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

type AddressPoint = [number, number, number];

const Map: React.FC = () => {
  const [addressPoints, setAddressPoints] = useState<AddressPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getLocations');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAddressPoints(data);
        } else {
          console.error('Unexpected response data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[-9.9088754, -63.0179083]} zoom={14.3} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {addressPoints.map((point, index) => (
        <Marker
          key={index}
          position={[point[0], point[1]]}
          icon={defaultIcon}
        >
          <Popup>
            <div>
              <p><strong>Quantidade:</strong> {point[2]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;



// import React, {useEffect} from 'react';
// import L from 'leaflet';
// import {loadScript} from '@/scripts/leaflet-layer';
// import 'leaflet/dist/leaflet.css';

// const Map: React.FC = () => {
//     useEffect(() => {
//         const initializeMap = async () => {
//             if (typeof window !== 'undefined') {
//                 if (document.getElementById('leaflet-heat')) {
//                     return;
//                 }

//                 try {
//                     await loadScript('https://unpkg.com/leaflet.heat/dist/leaflet-heat.js', 'leaflet-heat');

//                     const map = L.map('map').setView([-9.902562202981954, -63.036078526250044], 14.3);

//                     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     }).addTo(map);

//                     const addressPoints: [number, number, number, string][] = [
//                         [-9.9088754, -63.0179083, 0.9, 'Bairro A'],
//                         [-9.8916891, -63.0302109, 0.57, 'Bairro B'],
//                         [-9.9061054, -63.0330413, 0.85, 'Bairro C'],
//                         [-9.9061054, -63.0330413, 0.62, 'Bairro D'],
//                         [-9.895877, -63.049345, 0.9, 'Bairro E'],
//                         [-9.8909258, -63.0360982, 0.8, 'Bairro F'],
//                         [-9.9212258, -63.0412496, 0.73, 'Bairro G'],
//                         [-9.8921311, -63.0427215, 0.47, 'Bairro H'],
//                         [-9.9061054, -63.0330413, 0.28, 'Bairro I'],
//                         [-9.9282778, -63.0272674, 0.69, 'Bairro J'],
//                         [-9.9289778, -63.0574406, 0.35, 'Bairro K'],
//                         [-9.9111857, -63.0574406, 0.76, 'Bairro L'],
//                         [-9.8835043, -63.0387226, 0.55, 'Bairro M'],
//                         [-9.8863517, -63.0419855, 0.81, 'Bairro N'],
//                         [-9.9170958, -63.0154936, 0.20, 'Bairro O'],
//                         [-9.9061054, -63.0330413, 0.64, 'Bairro P'],
//                         [-9.9344922, -63.0296432, 0.83, 'Bairro Q'],
//                         [-9.9061054, -63.0330413, 0.71, 'Bairro R'],
//                         [-9.9061054, -63.0330413, 0.92, 'Bairro S'],
//                         [-9.9147454, -63.0397777, 0.49, 'Bairro T'],
//                         [-9.9378697, -63.0132861, 0.66, 'Bairro U'],
//                         [-9.895882, -63.0199087, 0.31, 'Bairro V'],
//                         [-9.9197007, -63.023588, 0.98, 'Bairro W'],
//                         [-9.907122, -63.0397777, 0.14, 'Bairro X'],
//                         [-9.9086475, -63.0280033, 0.26, 'Bairro Y'],
//                         [-9.8994995, -63.0397777, 0.43, 'Bairro Z'],
//                         [-9.898485, -63.0280033, 0.67, 'Bairro AA'],
//                         [-9.9017221, -63.0434574, 0.52, 'Bairro AB'],
//                         [-9.9049004, -63.0213804, 0.12, 'Bairro AC'],
//                         [-9.9317727, -63.0309468, 0.58, 'Bairro AD'],
//                         [-9.9061054, -63.0330413, 0.49, 'Bairro AE'],
//                         [-9.9061054, -63.0330413, 0.74, 'Bairro AF'],
//                         [-9.9106782, -63.0515529, 0.88, 'Bairro AG'],
//                         [-9.9111211, -63.0640646, 0.05, 'Bairro AH'],
//                         [-9.9061054, -63.0330413, 0.39, 'Bairro AI']
//                     ];

//                     const heatData = addressPoints.map(([lat, lng, intensity]) => [lat, lng, intensity]);

//                     const heat = (L as any).heatLayer(heatData, {
//                         radius: 25,
//                         minOpacity: 0.5,
//                         gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
//                     }).addTo(map);
//                     addressPoints.forEach(([lat, lng, intensity, bairro]) => {
//                         const circleMarker = L.circleMarker([lat, lng], {
//                             radius: 0,
//                             opacity: 1,
//                             fillOpacity: 0
//                         }).addTo(map);

//                         circleMarker.bindTooltip(bairro, {
//                             permanent: false,
//                             direction: 'top',
//                             opacity: 1
//                         });
//                     });
//                 } catch (error) {
//                     console.error('Failed to load the leaflet scripts', error);
//                 }
//             }
//         };

//         initializeMap();
//     }, []);

//     return <div id="map" style={{height: '100vh', width: '100%'}}></div>;
// };

// export default Map;

