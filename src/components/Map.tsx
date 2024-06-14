"use client";
import React, {useEffect} from 'react';
import L from 'leaflet';
import {loadScript} from '@/scripts/leaflet-layer';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
    useEffect(() => {
        const initializeMap = async () => {
            if (typeof window !== 'undefined') {
                if (document.getElementById('leaflet-heat')) {
                    return;
                }

                try {
                    await loadScript('https://unpkg.com/leaflet.heat/dist/leaflet-heat.js', 'leaflet-heat');

                    const map = L.map('map').setView([-9.902562202981954, -63.036078526250044], 14.3);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    const addressPoints: [number, number, number][] = [
                        [-9.9088754, -63.0179083, 0.9],
                        [-9.8916891, -63.0302109, 0.57],
                        [-9.9061054, -63.0330413, 0.85],
                        [-9.9061054, -63.0330413, 0.62],
                        [-9.895877, -63.049345, 0.7],
                        [-9.8909258, -63.0360982, 0.8],
                        [-9.9212258, -63.0412496, 0.73],
                        [-9.8921311, -63.0427215, 0.47],
                        [-9.9061054, -63.0330413, 0.28],
                        [-9.9282778, -63.0272674, 0.69],
                        [-9.9289778, -63.0574406, 0.35],
                        [-9.9111857, -63.0574406, 0.76],
                        [-9.8835043, -63.0387226, 0.55],
                        [-9.8863517, -63.0419855, 0.81],
                        [-9.9170958, -63.0154936, 0.20],
                        [-9.9061054, -63.0330413, 0.64],
                        [-9.9344922, -63.0296432, 0.83],
                        [-9.9061054, -63.0330413, 0.71],
                        [-9.9061054, -63.0330413, 0.92],
                        [-9.9147454, -63.0397777, 0.49],
                        [-9.9378697, -63.0132861, 0.66],
                        [-9.895882, -63.0199087, 0.31],
                        [-9.9197007, -63.023588, 0.98],
                        [-9.907122, -63.0397777, 0.14],
                        [-9.9086475, -63.0280033, 0.26],
                        [-9.8994995, -63.0397777, 0.43],
                        [-9.898485, -63.0280033, 0.67],
                        [-9.9017221, -63.0434574, 0.52],
                        [-9.9049004, -63.0213804, 0.12],
                        [-9.9317727, -63.0309468, 0.58],
                        [-9.9061054, -63.0330413, 0.49],
                        [-9.9061054, -63.0330413, 0.74],
                        [-9.9106782, -63.0515529, 0.88],
                        [-9.9111211, -63.0640646, 0.05],
                        [-9.9061054, -63.0330413, 0.39]
                    ];

                    const heat = (L as any).heatLayer(addressPoints, {
                        radius: 25,
                        minOpacity: 0.5,
                        gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                    }).addTo(map);
                } catch (error) {
                    console.error('Failed to load the leaflet scripts', error);
                }
            }
        };

        initializeMap();
    }, []);

    return <div id="map" style={{height: '100vh', width: '100%'}}></div>;
};

export default Map;

