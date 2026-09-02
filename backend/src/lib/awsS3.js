import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ENV from "./env.js";

const isAWSConfigured = Boolean(ENV.AWS_ACCESS_KEY_ID && ENV.AWS_SECRET_ACCESS_KEY);

let s3Client = null;

if (isAWSConfigured) {
  s3Client = new S3Client({
    region: ENV.AWS_REGION,
    credentials: {
      accessKeyId: ENV.AWS_ACCESS_KEY_ID,
      secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
    },
  });
  console.log("🟢 AWS S3 Client initialized successfully");
} else {
  console.log("ℹ️ AWS credentials not set. Operating in AWS Fallback Mode.");
}

/**
 * Generate a Presigned Upload URL for AWS S3
 */
export async function generateUploadPresignedUrl({ fileName, fileType, folder = "recordings" }) {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileKey = `${folder}/${timestamp}_${sanitizedFileName}`;

  if (isAWSConfigured && s3Client) {
    try {
      const command = new PutObjectCommand({
        Bucket: ENV.AWS_S3_BUCKET_NAME,
        Key: fileKey,
        ContentType: fileType,
      });

      const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 mins
      return {
        mode: "AWS_S3",
        uploadUrl,
        fileKey,
        bucket: ENV.AWS_S3_BUCKET_NAME,
        region: ENV.AWS_REGION,
        expiresInSeconds: 900,
      };
    } catch (error) {
      console.error("AWS S3 Presigned URL error:", error.message);
      throw error;
    }
  }

  // Fallback / Development Mode
  return {
    mode: "FALLBACK_MOCK",
    uploadUrl: `http://localhost:${ENV.PORT || 3000}/api/aws/mock-upload/${fileKey}`,
    fileKey,
    bucket: ENV.AWS_S3_BUCKET_NAME,
    message: "AWS S3 Credentials missing in .env. Operating in Fallback Mode.",
    expiresInSeconds: 900,
  };
}

/**
 * Generate a Presigned Download URL for private S3 assets
 */
export async function generateDownloadPresignedUrl(fileKey) {
  if (!fileKey) throw new Error("fileKey is required");

  if (isAWSConfigured && s3Client) {
    try {
      const command = new GetObjectCommand({
        Bucket: ENV.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      });

      const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
      return { downloadUrl, mode: "AWS_S3" };
    } catch (error) {
      console.error("AWS S3 Download URL error:", error.message);
      throw error;
    }
  }

  return {
    downloadUrl: `https://s3.${ENV.AWS_REGION}.amazonaws.com/${ENV.AWS_S3_BUCKET_NAME}/${fileKey}`,
    mode: "FALLBACK_MOCK",
  };
}

/**
 * Health & Integration status check
 */
export function getAWSStatus() {
  return {
    isAWSConfigured,
    region: ENV.AWS_REGION,
    bucket: ENV.AWS_S3_BUCKET_NAME,
    hasLambdaRunner: Boolean(ENV.AWS_LAMBDA_EXECUTE_URL),
    mode: isAWSConfigured ? "LIVE_AWS" : "FALLBACK_MOCK",
  };
}
