import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import attendanceRoutes from "./routes/attendanceRoutes";

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

export default app;


