# Step 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source + build assets needed for build step
COPY tsconfig.json ./
COPY scripts ./scripts
COPY src ./src

# Build (tsc + copy EJS templates into dist/)
RUN npm run build

# Step 2: Runtime
FROM node:20-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/app.js"]