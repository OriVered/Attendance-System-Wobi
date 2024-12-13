import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";



const app = express();

app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


export default app;


