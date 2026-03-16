import express from "express";

const router = express.Router();

// Proxy code execution to Piston API (optional, but keeps frontend simpler / avoids CORS issues)
router.post("/", async (req, res) => {
  try {
    const { language, version, files } = req.body || {};

    if (!language || !version || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({
        message: "language, version, and files[] are required",
      });
    }

    const pistonRes = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, version, files }),
    });

    const text = await pistonRes.text();

    // Forward status + body (Piston returns JSON on success; may return text on errors)
    res.status(pistonRes.status);
    res.setHeader("Content-Type", pistonRes.headers.get("content-type") || "text/plain");
    return res.send(text);
  } catch (error) {
    console.log("Error in executeRoute:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

