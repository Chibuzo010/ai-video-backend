import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import videoRoutes from "./routes/video.js";

const app = express();

// Create folders if they don't exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("clips")) fs.mkdirSync("clips");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/video", videoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("AI Video Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
