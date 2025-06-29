import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Shipments } from "../store/Shipment.api";
import { CircularProgress, Box } from "@mui/material";
import { useStore } from "zustand";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ShipmentMap = () => {
  const { shipments, isShipmentsLoading, getAllShipments } = useStore(Shipments);

  useEffect(() => {
    getAllShipments();
  }, [getAllShipments]);

  if (isShipmentsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

 


  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Default center (India)
      zoom={4}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {shipments.map(
        (ship) =>
          ship.currentLocation?.lat &&
          ship.currentLocation?.lng && (
            <Marker
              key={ship.shipmentId}
              position={[ship.currentLocation.lat, ship.currentLocation.lng]}
            >
              <Popup>
                <strong>ID:</strong> {ship.shipmentId}
                <br />
                <strong>Status:</strong> {ship.status}
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default ShipmentMap;
