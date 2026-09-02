# Multi-stage Dockerfile for AWS ECS / App Runner Deployment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and backend dependencies
COPY package*.json ./
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend source code
COPY backend ./backend

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "backend/src/server.js"]
