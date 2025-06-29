import express from "express";
const router = express.Router();
import {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipmentLocation,
  getShipmentETA,
} from "../controller/shipment.controller.js";
router.get("/shipments", getAllShipments);
router.get("/shipment/:id", getShipmentById);
router.post("/shipment", createShipment);
router.post("/shipment/:id/update-location", updateShipmentLocation);
router.get("/shipment/:id/eta", getShipmentETA);
export default router