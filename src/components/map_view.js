import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map_view.css';

const MapView = () => {
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState([]);
  const [expandedSite, setExpandedSite] = useState(null);  // New state to keep track of expanded site
  const [selectedDevice, setSelectedDevice] = useState(null);  // New state for selected device
  const [originalDevices, setOriginalDevices] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/devices/api/devices')
      .then(res => res.json())
      .then(data => {
        setOriginalDevices(data);  // Store the original list
        setDevices(data);          // Update the current list
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
      const filtered = originalDevices.filter(device =>
        device.MACAddress.slice(-4) === searchTerm
      );
      setDevices(filtered);  // Update the displayed list based on the filter
    } else {
      setDevices(originalDevices);  // Reset to the original list
    }
  };

  const handleDeviceClick = async (device) => {
    const deviceId = device.DeviceID;
    const response = await fetch(`http://localhost:3001/devices/api/device/location/${deviceId}`);
    const deviceDetails = await response.json();
    setSelectedDevice(deviceDetails);  // Setting the selected device


    const newLatLng = [deviceDetails.Latitude, deviceDetails.Longitude];
    if (circleRef.current) {
      circleRef.current.setLatLng(newLatLng);
    }
    if (mapRef.current) {
      mapRef.current.setView(newLatLng, 13);
    }
  };

  // Group devices by their site
  const groupedBySite = devices.reduce((acc, device) => {
    (acc[device.SiteID] = acc[device.SiteID] || {siteName: device.SiteName, devices: []}).devices.push(device);
    return acc;
  }, {});

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
        <br></br>
        <button onClick={handleSearch} className="map-button">Search</button>
        <button className="add-rf-button">Add RF</button>  {/* Add RF button added here */}
        <h3 style={{ textAlign: 'left', marginTop: '40px' }}>Locations:</h3>
        <div className="location-list">
          {Object.keys(groupedBySite).map(siteID => (
            <div key={siteID}>
              <div onClick={() => setExpandedSite(expandedSite === siteID ? null : siteID)}>
                {groupedBySite[siteID].siteName}
              </div>
              {expandedSite === siteID && (
                <div className="device-list">
                  {groupedBySite[siteID].devices.map(device => (
                    <div key={device.DeviceID}>
                      <div key={device.DeviceID} onClick={() => handleDeviceClick(device)} 
                          className={selectedDevice && selectedDevice.DeviceID === device.DeviceID ? "selected-mac" : ""}>
                        {device.MACAddress}
                      </div>
                      {selectedDevice && selectedDevice.DeviceID === device.DeviceID && (
                        <div className="device-details">
                          <h4>Selected Device Details</h4>
                          <p>MAC Address: <span style={{color: '#FF6666'}}>{selectedDevice.MACAddress}</span></p>
                          <p>Latitude: <span style={{color: '#FF6666'}}>{selectedDevice.Latitude}</span></p>
                          <p>Longitude: <span style={{color: '#FF6666'}}>{selectedDevice.Longitude}</span></p>
                          <p>Last User: <span style={{color: '#FF6666'}}>{selectedDevice.Username}</span></p>
                        </div>
                      )}
                    </div>
                  ))}
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
};   

export default MapView;
