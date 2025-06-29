import * as React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  OutlinedInput,
  Chip,
  Select,
} from "@mui/material";
import { Shipments } from "../store/Shipment.api.js";
import { useStore } from "zustand";
import { toast } from "react-toastify";
import locationData from "../store/location.json";

const statusOptions = ["In Transit", "Delivered", "Delayed", "Pending"];

export default function AddShip({ onClose }) {
  const { addShipment, getAllShipments } = useStore(Shipments);

  const [form, setForm] = React.useState({
    shipmentId: "",
    containerId: "",
    currentLocation: { location: "", lat: "", lng: "" },
    eta: new Date().toISOString().split("T")[0],
    status: "Pending",
    route: [],
  });

  // Handles location change
  const handleLocationChange = (e) => {
    const selectedLocation = locationData.find(
      (loc) => loc.location === e.target.value
    );
    if (selectedLocation) {
      setForm((prev) => ({
        ...prev,
        currentLocation: {
          location: selectedLocation.location,
          lat: selectedLocation.latitude,
          lng: selectedLocation.longitude,
        },
      }));
    }
  };

  // Handles route multi-select
  const handleRouteChange = (e) => {
    const selectedLocations = e.target.value;
    const fullRoute = selectedLocations.map((locName) => {
      const loc = locationData.find((l) => l.location === locName);
      return {
        location: loc.location,
        lat: loc.latitude,
        lng: loc.longitude,
      };
    });

    setForm((prev) => ({
      ...prev,
      route: fullRoute,
    }));
  };

  // Generic change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all required fields are properly formatted
    const shipmentData = {
      shipmentId: form.shipmentId,
      containerId: form.containerId,
      currentLocation: form.currentLocation.location 
        ? { 
            location: form.currentLocation.location,
            lat: form.currentLocation.lat || "",
            lng: form.currentLocation.lng || ""
          }
        : form.currentLocation,
      eta: form.eta,
      status: form.status,
      route: form.route.map(r => ({
        location: r.location,
        lat: r.lat || "",
        lng: r.lng || ""
      }))
    };

    console.log("Submitting shipment data:", shipmentData);
    const success = await addShipment(shipmentData);
    
    if (success) {
      toast.success("Shipment added successfully!");
      if (onClose) onClose();
    } else {
      toast.error("Failed to add shipment");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
        "& .MuiTextField-root": { width: "25ch" },
      }}
      autoComplete="off"
    >
      <TextField
        required
        name="shipmentId"
        label="Shipment ID"
        value={form.shipmentId}
        onChange={handleChange}
      />
      <TextField
        required
        name="containerId"
        label="Container ID"
        value={form.containerId}
        onChange={handleChange}
      />
      <TextField
        select
        required
        name="currentLocation"
        label="Current Location"
        value={form.currentLocation.location}
        onChange={handleLocationChange}
      >
        {locationData.map((location, index) => (
          <MenuItem key={index} value={location.location}>
            {location.location}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="eta"
        label="ETA"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.eta}
        onChange={handleChange}
      />

      <TextField
        select
        name="status"
        label="Status"
        value={form.status}
        onChange={handleChange}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Multi-select Route */}
      <Select
        multiple
        displayEmpty
        value={form.route.map((r) => r.location)}
        onChange={handleRouteChange}
        input={<OutlinedInput />}
        renderValue={(selected) =>
          selected.length === 0 ? "Select Route" : selected.join(", ")
        }
        sx={{ width: "25ch" }}
      >
        {locationData.map((location, index) => (
          <MenuItem key={index} value={location.location}>
            {location.location}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ alignSelf: "center", mt: 1 }}>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
