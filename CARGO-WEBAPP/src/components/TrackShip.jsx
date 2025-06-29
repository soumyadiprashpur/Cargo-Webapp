import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "zustand";
import { Shipments } from "../store/Shipment.api";
import { Box, CircularProgress } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

// Fix for custom icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TrackShip = () => {
  const { shipmentId } = useParams();
  const { shipments, isShipmentsLoading } = useStore(Shipments);
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    if (shipments) {
      const found = shipments.find((s) => s.shipmentId === shipmentId);
      setShipment(found);
    }
  }, [shipments, shipmentId]);

  if (isShipmentsLoading || !shipment) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Get the route points (lat, lng)
  const routePoints = shipment.route.map((routePoint) => [
    routePoint.lat,
    routePoint.lng,
  ]);

  return (
    <div>
      <MapContainer
        center={[20.5937, 78.9629]} // Default center (India)
        zoom={4}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shipment.route.map((routePoint, index) => (
          <Marker key={index} position={[routePoint.lat, routePoint.lng]}>
            <Popup>
              <strong>Point {index + 1}:</strong>
              <br />
              Lat: {routePoint.lat}, Lng: {routePoint.lng}
            </Popup>
          </Marker>
        ))}
        
        {/* Polyline to connect the route points */}
        <Polyline positions={routePoints} color="green" weight={4} opacity={0.7} />
      </MapContainer>
    </div>
  );
};

export default TrackShip;
