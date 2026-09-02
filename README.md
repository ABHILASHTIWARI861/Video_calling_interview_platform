<h1 align="center">✨ Full-Stack Interview Platform ✨</h1>

![Demo App](/frontend/vite-project/public/screenshot-for-readme.png)

✨ Highlights:

- 🧑‍💻 VSCode-Powered Code Editor
- 🔐 Authentication via Clerk
- 🎥 1-on-1 Video Interview Rooms
- 🧭 Dashboard with Live Stats
- 🔊 Mic & Camera Toggle, Screen Sharing & Recording
- 💬 Real-time Chat Messaging
- ⚙️ Secure Code Execution in Isolated Environment
- 🎯 Auto Feedback — Success / Fail based on test cases
- 🎉 Confetti on Success + Notifications on Fail
- 🧩 Practice Problems Page (solo coding mode)
- 🔒 Room Locking — allows only 2 participants
- 🧠 Background Jobs with Inngest (async tasks)
- 🧰 REST API with Node.js & Express
- ⚡ Data Fetching & Caching via TanStack Query
- 🤖 CodeRabbit for PR Analysis & Code Optimization
- 🧑‍💻 Git & GitHub Workflow (branches, PRs, merges)
- ☁️ **AWS Cloud Integration** — AWS S3 Presigned URLs for recordings/resumes, AWS Lambda runner readiness, & Docker containerization
- 🚀 Deployment on Render / AWS ECS / App Runner

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
NODE_ENV=development

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173

# ☁️ AWS Cloud Setup (Optional / Supports Fallback Mode)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=interview-platform-recordings
AWS_LAMBDA_EXECUTE_URL=your_optional_aws_lambda_runner_url
```

### Frontend (`/frontend/vite-project`)

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key
```

---

## ☁️ AWS API Endpoints

- `GET /api/aws/status` — Returns status of AWS S3 & Lambda integration.
- `POST /api/aws/upload-url` — Generates S3 Presigned Upload URL for recordings, code snapshots, or resumes.
- `POST /api/aws/download-url` — Generates temporary S3 Presigned Download URL for private viewing.
- `POST /api/execute` — Executes code via AWS Lambda runner (if configured) or Piston engine fallback.

---

## 🐳 Docker & AWS Deployment

Run locally with Docker Compose:
```bash
docker-compose up --build
```

Deploy to AWS ECS (Fargate) / App Runner:
```bash
docker build -t interview-platform-backend .
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔧 Run the Frontend

```bash
cd frontend/vite-project
npm install
npm run dev
```