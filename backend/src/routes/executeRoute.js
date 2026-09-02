import express from "express";
import ENV from "../lib/env.js";

const router = express.Router();

const PISTON_EXECUTE_URL =
  process.env.PISTON_EXECUTE_URL || "https://emkc.org/api/v2/piston/execute";

router.post("/", async (req, res) => {
  try {
    const { language, version, files } = req.body || {};

    if (!language || !version || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ message: "Invalid execute payload" });
    }

    // AWS Lambda Execution Engine
    if (ENV.AWS_LAMBDA_EXECUTE_URL) {
      try {
        const lambdaResponse = await fetch(ENV.AWS_LAMBDA_EXECUTE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, version, files }),
        });

        const lambdaData = await lambdaResponse.json();
        return res.status(lambdaResponse.status).json({
          ...lambdaData,
          runnerEngine: "AWS_LAMBDA",
        });
      } catch (lambdaError) {
        console.warn("AWS Lambda execution failed, falling back to Piston API:", lambdaError.message);
      }
    }

    // Default Piston API Engine
    const response = await fetch(PISTON_EXECUTE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, version, files }),
    });

    const data = await response.json();
    return res.status(response.status).json({
      ...data,
      runnerEngine: "PISTON_FALLBACK",
    });
  } catch (error) {
    console.log("Error in execute route:", error.message);
    return res.status(500).json({ message: "Failed to execute code", error: error.message });
  }
});

export default router;
