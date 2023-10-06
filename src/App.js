import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MapView from './components/map_view';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </div>
    </Router>
  );
}

const HomePage = () => (
  <div className="HomePage">
    <h1>Welcome to My App</h1>
    <Link to="/map">
      <button className="GoToMapButton">
        Go to Map
      </button>
    </Link>
  </div>
);

export default App;
