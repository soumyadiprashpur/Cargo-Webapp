import express from "express";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment.routes.js";

dotenv.config();

const app = express();
const PORT = 8000;

// ✅ Corrected: make it an array
const allowedOrigins = ["https://cargo-webapp.vercel.app",
  "http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use("/api", shipmentRoutes);

// ✅ Corrected: connect to DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at PORT:", PORT);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});
