import express from "express";
import { generateUploadPresignedUrl, generateDownloadPresignedUrl, getAWSStatus } from "../lib/awsS3.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// GET AWS Integration Status
router.get("/status", (_, res) => {
  try {
    const status = getAWSStatus();
    return res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch AWS status", error: error.message });
  }
});

// POST Presigned Upload URL (Protected)
router.post("/upload-url", protectRoute, async (req, res) => {
  try {
    const { fileName, fileType, folder } = req.body || {};

    if (!fileName || !fileType) {
      return res.status(400).json({ message: "fileName and fileType are required" });
    }

    const result = await generateUploadPresignedUrl({ fileName, fileType, folder });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error generating AWS upload URL:", error.message);
    return res.status(500).json({ message: "Failed to generate AWS upload URL", error: error.message });
  }
});

// POST Presigned Download URL (Protected)
router.post("/download-url", protectRoute, async (req, res) => {
  try {
    const { fileKey } = req.body || {};

    if (!fileKey) {
      return res.status(400).json({ message: "fileKey is required" });
    }

    const result = await generateDownloadPresignedUrl(fileKey);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error generating AWS download URL:", error.message);
    return res.status(500).json({ message: "Failed to generate AWS download URL", error: error.message });
  }
});

// Mock upload endpoint for local testing when AWS credentials aren't set
router.put("/mock-upload/*", (req, res) => {
  return res.status(200).json({
    message: "Mock S3 file upload successful (Fallback Mode)",
    uploadedPath: req.params[0],
    status: "SUCCESS",
  });
});

export default router;
