# HorizonFrame Website Deployment Guide

This guide provides step-by-step instructions for deploying updates to the HorizonFrame website (horizonframeapp.com).

## Overview

The HorizonFrame website is a Next.js application deployed on a DigitalOcean droplet using Coolify as the deployment platform. Coolify manages the Docker containers and Traefik handles the routing.

## Prerequisites

- SSH access to the DigitalOcean droplet (`root@104.236.109.220`)
- Local build of the Next.js application
- Basic understanding of Docker and Next.js

## Deployment Process

### 1. Build the Application Locally

```bash
# Navigate to the project directory
cd /Users/colesegura/Code/horizon-frame

# Install dependencies
npm install

# Build the application (with linting disabled if necessary)
npx next build --no-lint
```

### 2. Access the Coolify Dashboard

The Coolify dashboard is the preferred way to update the website.

```bash
# Open in browser
http://104.236.109.220:8000
```

If you can't access it directly, create an SSH tunnel:

```bash
ssh -L 8000:localhost:8000 root@104.236.109.220
```

Then access it at http://localhost:8000 in your browser.

### 3. Deploy via Coolify Dashboard

1. Log in to the Coolify dashboard
2. Find the HorizonFrame project
3. Click on "Redeploy" or "Deploy"
4. Wait for the deployment to complete

### 4. Alternative: Manual Deployment (if Coolify Dashboard is unavailable)

If the Coolify dashboard is unavailable, you can deploy manually:

```bash
# SSH into the server
ssh root@104.236.109.220

# Create a tarball of the build files locally
cd /Users/colesegura/Code/horizon-frame
tar -czf horizon-frame-update.tar.gz .next public package.json package-lock.json

# Transfer the tarball to the server
scp horizon-frame-update.tar.gz root@104.236.109.220:/tmp/

# On the server, extract the files to the application directory
# First, identify the container ID
docker ps | grep horizon

# Copy the files into the container
docker cp /tmp/horizon-frame-update.tar.gz CONTAINER_ID:/tmp/
docker exec CONTAINER_ID bash -c "cd /app && tar -xzf /tmp/horizon-frame-update.tar.gz"

# Restart the container
docker restart CONTAINER_ID
```

### 5. Verify the Deployment

```bash
# Check if the website is accessible
curl -I https://horizonframeapp.com

# Check the container logs for any errors
docker logs CONTAINER_ID
```

## Troubleshooting

### Website Returns 404 or 504 Error

1. Check if the Next.js application is running inside the container:
   ```bash
   docker exec CONTAINER_ID curl http://localhost:3000
   ```

2. Check if the container is running:
   ```bash
   docker ps | grep horizon
   ```

3. Check the container logs:
   ```bash
   docker logs CONTAINER_ID
   ```

4. Restart the container:
   ```bash
   docker restart CONTAINER_ID
   ```

### Coolify Dashboard is Unavailable

If the Coolify dashboard returns a 504 Gateway Timeout:

1. Check if Coolify is running:
   ```bash
   docker ps | grep coolify
   ```

2. Restart Coolify:
   ```bash
   docker restart coolify
   ```

3. If that doesn't work, try the manual deployment method described above.

## Important Notes

- The website uses a dark obsidian background with aurora accents theme
- The site includes email subscription forms for early access sign-ups
- The website is served over HTTPS using Traefik as a reverse proxy
- Coolify manages the Docker containers and deployment process

## Contact

For assistance with deployment issues, contact:
- Cole Segura (cole@horizonframeapp.com)
