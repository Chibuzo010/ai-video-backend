import express from "express";
import multer from "multer";
import { exec } from "child_process";

const router = express.Router();

// Multer config (upload video)
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1000 * 1000 * 500 } // 500MB
});

// POST: Upload & auto-clip video
router.post("/clip", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video uploaded" });
  }

  const inputPath = req.file.path;
  const outputPath = `clips/clip-${Date.now()}.mp4`;

  // Clip first 10 seconds (you can change duration)
  const command = `ffmpeg -i ${inputPath} -t 10 -c copy ${outputPath}`;

  exec(command, (error) => {
    if (error) {
      return res.status(500).json({ error: "Video processing failed" });
    }

    res.json({
      message: "Video clipped successfully",
      file: outputPath
    });
  });
});

export default router;
