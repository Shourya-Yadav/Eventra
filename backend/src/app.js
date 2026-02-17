import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";

// Load environment variables FIRST
dotenv.config({ path: "../.env" }); // Use this if app.js is inside src

// Validate env early
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Check your .env file.");
    process.exit(1);
}

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/memberships", membershipRoutes);

// Test Route
app.get("/home", (req, res) => {
    res.status(200).json({ message: "API working" });
});


// Database + Server Start
const startServer = async () => {
    try {

        // Modern mongoose connection (no deprecated options)
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected successfully");

        const PORT = process.env.PORT || 8000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Database connection failed");
        console.error(error.message);
        process.exit(1);
    }
};

startServer();
