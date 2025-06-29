import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = "mongodb+srv://pabitrakumar50abc:cWRALihTnKjMWW6v@cluster0.ic07v0k.mongodb.net/cargoshipment?retryWrites=true&w=majority&appName=Cluster0"
    await mongoose.connect(URI); // No need for extra options
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
