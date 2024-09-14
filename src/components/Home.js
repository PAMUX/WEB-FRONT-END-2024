import React, { useEffect, useState } from 'react';
import { getTrainLocations } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the custom icon URL relative to the public directory
const trainIconUrl = '/train.png'; // Path relative to public directory

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getTrainLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const styles = {
    container: {
      padding: '20px',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', // Creates 4 columns
      gap: '20px', // Space between the cards
      padding: '20px',
    },
    card: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s',
    },
    mapContainer: {
      height: '400px',
      width: '100%',
      marginTop: '20px',
    },
  };

  const defaultCenter = [7.8731, 80.7718]; // Default coordinates for Sri Lanka

  // Create custom icon
  const trainCustomIcon = new L.Icon({
    iconUrl: trainIconUrl,
    iconSize: [32, 32], // Adjust size as needed
    iconAnchor: [16, 32], // Adjust anchor position
    popupAnchor: [0, -32], // Adjust popup position
  });

  return (
    <div style={styles.container}>
      <h1>Real-Time Train Locations</h1>
      <div style={styles.gridContainer}>
        {locations.map((location) => (
          <div
            key={location._id}
            style={styles.card}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h3>Train ID: {location.trainId}</h3>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Timestamp: {new Date(location.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div style={styles.mapContainer}>
        <MapContainer center={defaultCenter} zoom={8} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <Marker
              key={location._id}
              position={[location.latitude, location.longitude]}
              icon={trainCustomIcon} // Use the custom icon here
            >
              <Popup>
                Train ID: {location.trainId} <br />
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
