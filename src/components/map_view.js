import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map_view.css';

const MapView = () => {
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);  // New state
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/devices/api/devices')
      .then(res => res.json())
      .then(data => {
        setDevices(data);
        setFilteredDevices(data);  // Initialize filteredDevices
      })
      .catch(error => console.error('Error fetching devices:', error));

    if (!mapRef.current) {
      mapRef.current = L.map('leaflet-map', {
        zoomControl: false
      }).setView([33.976253, -117.605278], 13);

      L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="https://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }).addTo(mapRef.current);

      circleRef.current = L.circle([33.976253, -117.605278], {
        color: '#0000FF',
        fillColor: '#30f',
        fillOpacity: 0.5,
        radius: 2
      }).addTo(mapRef.current);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.length === 4) {
      const filtered = devices.filter(device =>
        device.MACAddress.slice(-4) === searchTerm
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(devices);
    }
  }

  const handleDeviceClick = async (device) => {
    const deviceId = device.DeviceID;
    const response = await fetch(`http://localhost:3001/devices/api/device/location/${deviceId}`);
    const deviceDetails = await response.json();
    setSelectedDevice(deviceDetails);

    const newLatLng = [deviceDetails.Latitude, deviceDetails.Longitude];
    if (circleRef.current) {
      circleRef.current.setLatLng(newLatLng);
    }
    if (mapRef.current) {
      mapRef.current.setView(newLatLng, 13);
    }
  }

  return (
    <div className="map-container">
      <div className="left-panel">
        <h1>RF Devices</h1>
        <input 
          type="text" 
          placeholder="Search... (last 4 of the mac address)" 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="gradient-button">Search</button>
        <h3 style={{ textAlign: 'left', marginTop: '40px' }}> MAC Address:</h3>
        <div className="search-results">
          {filteredDevices.map(device => (  // Changed to filteredDevices
            <div key={device.DeviceID}>
              <div onClick={() => handleDeviceClick(device)} style={{ fontWeight: 'bold' }}>
               {device.MACAddress}
              </div>
              {selectedDevice && selectedDevice.DeviceID === device.DeviceID && (
                <div className="device-details">
                  <h4>Selected Device Details</h4>
                  <p>MAC Address: <span style={{color: 'red'}}>{selectedDevice.MACAddress}</span></p>
                  <p>Latitude: <span style={{color: 'red'}}>{selectedDevice.Latitude}</span></p>
                  <p>Longitude: <span style={{color: 'red'}}>{selectedDevice.Longitude}</span></p>
                  <p>Last User: <span style={{color: 'red'}}>{selectedDevice.Username}</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <div id="leaflet-map"></div>
      </div>
    </div>
  );
}

export default MapView;
