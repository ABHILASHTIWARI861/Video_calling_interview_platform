# ==========================================
# Stage 1: Install Dependencies
# ==========================================
FROM node:20-alpine AS deps

WORKDIR /app

# Install build dependencies if needed (alpine edge tools)
RUN apk add --no-cache libc6-compat

# Copy workspace package definitions for caching
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install only production dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init for proper PID 1 signal forwarding (graceful container shutdown)
RUN apk add --no-cache dumb-init curl

ENV NODE_ENV=production
ENV PORT=3000

# Security: Set working directory permissions and switch to non-root node user
RUN chown -R node:node /app

USER node

# Copy dependencies and application source
COPY --chown=node:node --from=deps /app/backend/node_modules ./backend/node_modules
COPY --chown=node:node backend ./backend
COPY --chown=node:node package*.json ./

WORKDIR /app/backend

EXPOSE 3000

# Container Healthcheck (checks backend health endpoint)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/home || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "src/server.js"]
