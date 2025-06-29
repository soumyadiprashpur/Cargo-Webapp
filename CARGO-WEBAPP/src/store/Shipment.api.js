import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"; // Ensure axiosInstance is correctly set up

export const Shipments = create((set, get) => ({
  shipments: [],
  isShipmentsLoading: false,
  
  getAllShipments: async () => {
    set({ isShipmentsLoading: true });
    try {
      const res = await axiosInstance.get("/shipments");
      console.log("Fetched shipments:", res.data);
      set({ shipments: res.data });
      return true;
    } catch (error) {
      toast.error("Error fetching shipments: " + error.message);
      return false;
    } finally {
      set({ isShipmentsLoading: false });
    }
  },
  
  addShipment: async (shipmentData) => {
    try {
      console.log("Adding shipment with data:", shipmentData);
      
      // Ensure the currentLocation is properly formatted
      const formattedLocation = typeof shipmentData.currentLocation === 'string' 
        ? { location: shipmentData.currentLocation }
        : shipmentData.currentLocation;

      // Format the data before sending
      const formattedData = {
        shipmentId: shipmentData.shipmentId,
        containerId: shipmentData.containerId,
        currentLocation: formattedLocation,
        eta: shipmentData.eta,
        status: shipmentData.status,
        route: shipmentData.route
      };

      console.log("Formatted data to send:", formattedData);
      const res = await axiosInstance.post("/shipment", formattedData);
      console.log("Server response:", res.data);

      // Ensure the response data has all required fields
      const newShipment = {
        ...formattedData,
        ...res.data,
        currentLocation: res.data.currentLocation || formattedLocation,
        eta: res.data.eta || formattedData.eta,
        status: res.data.status || formattedData.status
      };

      console.log("Final shipment data to store:", newShipment);

      // Update local state with the complete data
      set((state) => ({
        shipments: [...state.shipments, newShipment],
      }));
      
      return true;
    } catch (error) {
      console.error("Error adding shipment:", error);
      toast.error("Failed to add shipment: " + error.message);
      return false;
    }
  }
}));
