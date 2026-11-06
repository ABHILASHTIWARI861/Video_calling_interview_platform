# ==========================================
# Stage 1: Build Vite React Application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for Vite (client-side baked variables)
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ARG VITE_STREAM_API_KEY

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STREAM_API_KEY=$VITE_STREAM_API_KEY

# Copy dependencies list
COPY package*.json ./

# Install dependencies (use npm ci for clean reproducible builds)
RUN npm install

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# ==========================================
# Stage 2: Serve Static Assets with Nginx
# ==========================================
FROM nginx:alpine-slim AS runner

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
