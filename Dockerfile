# ===== TM R&D ASSESSMENT - DOCKER CONTAINERIZATION =====
# Author: Naufal Arrashid
# Project: TM R&D Assessment
# Description: Production-ready Docker container for Angular application

# Use Node.js 18 Alpine as base image (lightweight and secure)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
# Note: We need dev dependencies for Angular CLI and build tools
RUN npm ci

# Copy source code to container
COPY . .

# Build the Angular application for production
# This creates optimized, minified files in dist/tm-rnd-assessment/browser
RUN npm run build

# Expose port 80 for the web server
EXPOSE 80

# Start the application using http-server to serve the built files
# http-server serves static files efficiently in production
# --host 0.0.0.0 allows external connections to the container
CMD ["npx", "http-server", "dist/tm-rnd-assessment/browser", "-p", "80", "--host", "0.0.0.0"]
