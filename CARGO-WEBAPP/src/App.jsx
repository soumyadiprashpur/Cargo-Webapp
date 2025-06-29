import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ShipmentMap from "./components/ShipmentMap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button } from "@mui/material";
import TrackShip from "./components/TrackShip";
import './index.css';

const App = () => {
  return (
    <Router>
      <Box sx={{ padding: 0 }}>
        <Header />

        {/* Optional Nav Buttons */}
        {/* <Box sx={{ mb: 2 }}>
          <Button component={Link} to="/" variant="contained" sx={{ mr: 2 }}>
            Dashboard
          </Button>
          <Button component={Link} to="/map" variant="outlined">
            Shipment Map
          </Button>
        </Box> */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<ShipmentMap />} />

          <Route path="/track/:shipmentId" element={<TrackShip  />} />

        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
    </Router>
  );
};

export default App;
