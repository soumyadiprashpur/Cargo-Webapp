import Shipment from "../models/shipment.model.js"

export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentById = async (req, res) => {
  try {
    console.log(req.params.id);
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment)
      return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createShipment = async (req, res) => {
  console.log(req.body)
  const { shipmentId, containerId, route, currentLocation, eta, status } =
    req.body;

  if (!shipmentId || !containerId || !currentLocation) {
    return res.status(400).json({ message: "Provide all details" });
  }
  //console.log("HELLO1")

  try {
    const newShipment = new Shipment({
      shipmentId,
      containerId,
      route,
      currentLocation,
      eta,
      status,
    });

    const savedShipment = await newShipment.save();

    // console.log("HELLO2")
    if (savedShipment) {
      res
        .status(201)
        .json({  shipment: savedShipment });
    } else {
      res.status(400).json({ message: "Some error while saving" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateShipmentLocation = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment)
      return res.status(404).json({ message: "Shipment not found" });

    shipment.currentLocation = req.body.currentLocation;
    await shipment.save();
    res.json({ message: "Location updated", shipment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipmentETA = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment)
      return res.status(404).json({ message: "Shipment not found" });

    // Placeholder: Logic to compute ETA dynamically
    res.json({ eta: shipment.eta });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
