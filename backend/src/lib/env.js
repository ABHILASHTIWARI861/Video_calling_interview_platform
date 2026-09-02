import dotenv from 'dotenv';// Ye dotenv library ko load karta hai
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });  //loads environment variables from backend/.env into process.env
                  //.env file must be located in the current working directory
                  //Usually CWD =📁 folder jahan se tum npm run start ya npm run dev chalaye ho (i.e server.js ko run kiye ho) {here it is backend}
// I am running server.js via npm run start or npm run dev ,which is present in package.json,and this package.json is present in backend folder
// Therefore this backend folder is my CWD(Current Working Directory) and .env file should be present in this backend folder
const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGET_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    // AWS Configuration
    AWS_REGION: process.env.AWS_REGION || "us-east-1",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "interview-platform-recordings",
    AWS_LAMBDA_EXECUTE_URL: process.env.AWS_LAMBDA_EXECUTE_URL || ""
}

export default ENV;