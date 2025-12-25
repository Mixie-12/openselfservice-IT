# Deployment Guide - Sysnordic Self Service

This guide provides step-by-step instructions for deploying the Sysnordic Self Service application on an LXC container with a GitHub self-hosted runner.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [LXC Container Setup](#lxc-container-setup)
3. [Install System Dependencies](#install-system-dependencies)
4. [Install Node.js](#install-nodejs)
5. [Install Docker](#install-docker)
6. [Setup GitHub Self-Hosted Runner](#setup-github-self-hosted-runner)
7. [Clone and Configure the Application](#clone-and-configure-the-application)
8. [Deploy with Docker Compose](#deploy-with-docker-compose)
9. [Deploy for Development (Optional)](#deploy-for-development-optional)
10. [Verify Deployment](#verify-deployment)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- **Proxmox VE** or another LXC-compatible host
- **Root access** to the host system
- **GitHub repository access** to Mixie-12/openselfservice-IT
- **Basic knowledge** of Linux, Docker, and command line operations

### System Requirements

- **OS**: Ubuntu 22.04 LTS or Debian 12 (recommended for LXC)
- **CPU**: Minimum 4 cores (8+ recommended for production)
- **RAM**: Minimum 8GB (16GB+ recommended for production)
- **Storage**: Minimum 50GB free space
- **Network**: Internet connectivity and open ports 3000, 3001

---

## 1. LXC Container Setup

### Create LXC Container

On your Proxmox host or LXC-compatible system:

```bash
# For Proxmox VE (via web UI or command line):
# - Container ID: 100 (or your preferred ID)
# - Template: Ubuntu 22.04 or Debian 12
# - Disk: 50GB+
# - CPU: 4 cores
# - Memory: 8192 MB
# - Network: Bridge to your network

# If using command line:
pct create 100 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname sysnordic-app \
  --memory 8192 \
  --cores 4 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --storage local-lvm \
  --rootfs local-lvm:50
```

### Start and Access Container

```bash
# Start the container
pct start 100

# Access container console
pct enter 100
```

### Initial Container Configuration

Once inside the container:

```bash
# Update system packages
apt update && apt upgrade -y

# Install basic utilities
apt install -y curl wget git vim nano sudo ca-certificates gnupg lsb-release

# Set timezone (optional)
timedatectl set-timezone Europe/Oslo

# Create a non-root user (recommended)
adduser sysnordic
usermod -aG sudo sysnordic

# Switch to the new user
su - sysnordic
```

---

## 2. Install System Dependencies

Install essential build tools and libraries:

```bash
# Install build essentials
sudo apt install -y build-essential python3 python3-pip

# Install additional dependencies needed for the application
sudo apt install -y libc6-compat openjdk-11-jre-headless

# Install Git LFS (if needed for large files)
sudo apt install -y git-lfs
git lfs install
```

---

## 3. Install Node.js

The application requires **Node.js 22** or higher.

### Install Node.js via NodeSource

```bash
# Download and run the NodeSource setup script for Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v22.x.x or higher
npm --version   # Should show 10.x.x or higher
```

### Alternative: Install via NVM (Node Version Manager)

If you prefer NVM for version management:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js 22
nvm install 22
nvm use 22
nvm alias default 22

# Verify installation
node --version
npm --version
```

---

## 4. Install Docker

Docker is required for containerized deployment.

### Install Docker Engine

```bash
# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt update

# Install Docker Engine, containerd, and Docker Compose
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify Docker installation
sudo docker --version
sudo docker compose version
```

### Configure Docker Permissions

Add your user to the docker group to run Docker without sudo:

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply group changes (or log out and back in)
newgrp docker

# Verify Docker works without sudo
docker run hello-world
```

### Enable Docker to Start on Boot

```bash
sudo systemctl enable docker
sudo systemctl enable containerd
```

---

## 5. Setup GitHub Self-Hosted Runner

### Create Runner on GitHub

1. Go to your repository: `https://github.com/Mixie-12/openselfservice-IT`
2. Navigate to **Settings** → **Actions** → **Runners**
3. Click **New self-hosted runner**
4. Select **Linux** as the operating system
5. Follow the provided commands, or use the steps below

### Download and Configure Runner

```bash
# Create a directory for the runner
mkdir -p ~/actions-runner && cd ~/actions-runner

# Download the latest runner package (check GitHub for the latest version)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure the runner (use the token from GitHub)
./config.sh --url https://github.com/Mixie-12/openselfservice-IT --token YOUR_REGISTRATION_TOKEN

# When prompted:
# - Enter runner group: Press Enter (default)
# - Enter runner name: sysnordic-lxc-runner (or your preferred name)
# - Enter work folder: Press Enter (default _work)
# - Labels: docker,lxc,production (or your preferred labels)
```

### Install Runner as a Service

```bash
# Install the runner service
sudo ./svc.sh install

# Start the runner service
sudo ./svc.sh start

# Check runner status
sudo ./svc.sh status

# Enable runner to start on boot (already done by install)
```

### Verify Runner Registration

1. Go back to **Settings** → **Actions** → **Runners** in your GitHub repository
2. You should see your runner listed as "Idle" or "Active"

---

## 6. Clone and Configure the Application

### Clone the Repository

```bash
# Navigate to your preferred directory
cd ~

# Clone the repository
git clone https://github.com/Mixie-12/openselfservice-IT.git

# Navigate to the project directory
cd openselfservice-IT
```

### Install Dependencies

```bash
# Install all npm packages (this may take several minutes)
npm ci

# The postinstall script will automatically install Playwright dependencies
# If needed, manually install Playwright:
npx playwright install --with-deps chromium
```

### Configure Environment Variables

The application requires environment variables for both the frontend and API.

#### Create Frontend Environment File

```bash
# Copy the development environment as a template
cp apps/frontend/.env.development apps/frontend/.env.production

# Edit the production environment file
nano apps/frontend/.env.production
```

Update the following values:

```env
PORT=3000

ANALYZE=false

NEXT_PUBLIC_LOG_LEVEL=info
NEXT_PUBLIC_LOG_COLORS_ENABLED=false
NEXT_PUBLIC_LOG_FORMAT=json

NEXT_PUBLIC_SUPPORTED_LOCALES=en,de,pl,no
NEXT_PUBLIC_DEFAULT_LOCALE=no

# Update with your actual domain or IP
NEXT_PUBLIC_BASE_URL=http://your-server-ip:3000

# Update with your actual API URL
NEXT_PUBLIC_API_URL=http://your-server-ip:3001/api
NEXT_PUBLIC_API_URL_INTERNAL=http://api-harmonization:3001/api

# Generate a new secret: openssl rand -base64 32
AUTH_SECRET=your-generated-secret-here
AUTH_TRUST_HOST=true

# Configure OAuth providers (optional)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Database (SQLite for development, consider PostgreSQL for production)
AUTH_DATABASE_URL=file:./prod.db
AUTH_DEFAULT_USER_ROLE=selfservice_user
```

#### Create API Environment File

```bash
# Copy the local environment as a template
cp apps/api-harmonization/.env.local apps/api-harmonization/.env.production

# Edit the production environment file
nano apps/api-harmonization/.env.production
```

Update the following values:

```env
NODE_ENV=production
PORT=3001

TELEMETRY_DISABLED=false

API_PREFIX=api

LOG_LEVEL=info
LOG_COLORS_ENABLED=false
LOG_FORMAT=json

DEFAULT_LOCALE=no
DEFAULT_CURRENCY=NOK
DEFAULT_PRODUCT_UNIT=PCS

SUPPORTED_CURRENCIES=EUR,USD,PLN,NOK
SUPPORTED_LOCALES=en,de,pl,no

# Update with your actual frontend URL
FRONT_BASE_URLS=http://your-server-ip:3000

MOCKED_INTEGRATION_DELAYS_ENABLED=false

# Configure external integrations as needed
CMS_STRAPI_BASE_URL=
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
MEDUSAJS_BASE_URL=
MEDUSAJS_PUBLISHABLE_API_KEY=
MEDUSAJS_ADMIN_API_KEY=

# Redis cache (optional, recommended for production)
CACHE_ENABLED=true
CACHE_TTL=3600
CACHE_REDIS_HOST=localhost
CACHE_REDIS_PORT=6379
CACHE_REDIS_PASS=your-redis-password

SEARCH_ARTICLES_INDEX_NAME=production

# Add other integration credentials as needed
ZENDESK_API_URL=
ZENDESK_API_TOKEN=
ZENDESK_TOPIC_FIELD_ID=
```

---

## 7. Deploy with Docker Compose

This is the **recommended deployment method** for production.

### Update Docker Compose Configuration

Edit the `docker-compose.yml` file to match your environment:

```bash
nano docker-compose.yml
```

Key updates:

1. Replace environment variables with production values
2. Update `NEXT_PUBLIC_BASE_URL` and `FRONT_BASE_URLS` with your actual domain/IP
3. Generate new secrets for `AUTH_SECRET` and `CACHE_REDIS_PASS`
4. Configure external integrations if needed

### Create Docker Network

```bash
# Create the app network (only needed once)
docker network create app_network
```

### Build and Deploy

```bash
# Build and start the containers
docker compose up -d --build

# This will:
# 1. Build the frontend container from apps/frontend/Dockerfile
# 2. Build the api-harmonization container from apps/api-harmonization/Dockerfile
# 3. Start both services in detached mode
# 4. Expose frontend on port 3000
# 5. Expose API on port 3001
```

### Monitor Deployment

```bash
# View logs for both services
docker compose logs -f

# View logs for a specific service
docker compose logs -f frontend
docker compose logs -f api-harmonization

# Check container status
docker compose ps

# Check resource usage
docker stats
```

---

## 8. Deploy for Development (Optional)

If you want to run the application in development mode for testing:

### Using Turbo (Recommended for Dev)

```bash
# Start all services in development mode
npm run dev

# This will:
# - Watch for changes in all packages
# - Automatically rebuild dependencies
# - Hot-reload frontend and API
# - Run on http://localhost:3000 (frontend) and http://localhost:3001/api (API)
```

### Using Individual Package Scripts

```bash
# Terminal 1: Start API
cd apps/api-harmonization
npm run dev

# Terminal 2: Start Frontend
cd apps/frontend
npm run dev
```

---

## 9. Verify Deployment

### Check Application Health

```bash
# Test frontend
curl http://localhost:3000

# Test API
curl http://localhost:3001/api

# If using external IP/domain
curl http://your-server-ip:3000
curl http://your-server-ip:3001/api
```

### Access the Application

1. **Frontend**: Open a browser and navigate to:
   - Local: `http://localhost:3000`
   - External: `http://your-server-ip:3000`

2. **API**: Test API endpoints:
   - Local: `http://localhost:3001/api`
   - External: `http://your-server-ip:3001/api`

### Test Authentication

Default login credentials (from seed data):

```
Username: jane@example.com
Password: admin
```

### Verify GitHub Actions

The repository includes automated CI/CD workflows that run on your self-hosted runner:

1. **CI Workflow** (`.github/workflows/ci-self-hosted.yaml`):
   - Runs on pull requests
   - Executes linting, formatting, build, and tests
   - Provides test summaries

2. **Deployment Workflow** (`.github/workflows/deploy-self-hosted.yaml`):
   - Runs on push to `main` branch
   - Automatically deploys the application
   - Creates default environment variables if not provided
   - Supports both Docker and Node.js (PM2) deployment modes
   - Includes health checks and deployment summaries

#### Test the CI/CD Pipeline

```bash
# Push a commit to trigger the deployment workflow
git add .
git commit -m "Test deployment"
git push origin main

# Or manually trigger deployment via GitHub UI:
# Go to Actions → Deploy to Self-Hosted Runner → Run workflow
```

#### Check Workflow Execution

1. Go to **Actions** tab in GitHub
2. Verify that workflows run on your self-hosted runner (labeled with "self-hosted")
3. Check deployment summary in workflow run details
4. View deployment logs for debugging

#### Monitor Runner Status

```bash
# Check runner service status
cd ~/actions-runner
sudo ./svc.sh status

# View runner logs
sudo journalctl -u actions.runner.* -f

# Restart runner if needed
sudo ./svc.sh restart
```

#### Manual Deployment Trigger

You can manually trigger deployment with different modes:

1. Go to **Actions** → **Deploy to Self-Hosted Runner**
2. Click **Run workflow**
3. Select deployment mode:
   - `docker` (default) - Deploys with Docker Compose
   - `nodejs` - Deploys with PM2 process manager

---

## 10. Troubleshooting

### Common Issues and Solutions

#### Issue: Docker daemon not running

```bash
# Check Docker status
sudo systemctl status docker

# Start Docker if not running
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker
```

#### Issue: Port already in use

```bash
# Check what's using port 3000 or 3001
sudo lsof -i :3000
sudo lsof -i :3001

# Stop the conflicting process or change ports in docker-compose.yml
```

#### Issue: GitHub runner not connecting

```bash
# Check runner status
cd ~/actions-runner
sudo ./svc.sh status

# View runner logs
sudo journalctl -u actions.runner.* -f

# Restart runner service
sudo ./svc.sh stop
sudo ./svc.sh start
```

#### Issue: Container build fails

```bash
# Clean Docker build cache
docker builder prune -a

# Remove old containers and images
docker compose down
docker system prune -a

# Rebuild from scratch
docker compose up -d --build --force-recreate
```

#### Issue: Out of memory during build

```bash
# Increase container memory limits in Proxmox
# Or add swap space:
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

#### Issue: Node.js version mismatch

```bash
# Check current version
node --version

# If using NVM, switch version
nvm use 22

# If installed via apt, reinstall
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Issue: npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use clean install
npm ci
```

#### Issue: Database errors

```bash
# For SQLite (development)
# Remove old database and recreate
rm apps/frontend/dev.db

# Run database migrations (if applicable)
cd apps/frontend
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

### Logs and Debugging

```bash
# View Docker logs
docker compose logs -f

# View system logs
sudo journalctl -u docker -f

# View runner logs
cd ~/actions-runner
sudo journalctl -u actions.runner.* -f

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top
```

### Performance Optimization

```bash
# For production, consider:
# 1. Use PostgreSQL instead of SQLite
# 2. Enable Redis caching
# 3. Use NGINX as reverse proxy
# 4. Enable SSL/TLS with Let's Encrypt
# 5. Configure firewall rules
# 6. Set up monitoring (Prometheus, Grafana)
# 7. Configure automatic backups
```

---

## Additional Resources

- **Project Documentation**: `apps/docs/`
- **Docker Documentation**: See `apps/docs/docs/guides/deployment/docker.md`
- **GitHub Actions**: `.github/workflows/`
- **Environment Examples**: 
  - `apps/frontend/.env.development`
  - `apps/api-harmonization/.env.local`

## Security Recommendations

1. **Change default credentials** - Generate new secrets and passwords
2. **Configure firewall** - Only expose necessary ports
3. **Enable HTTPS** - Use Let's Encrypt for SSL certificates
4. **Regular updates** - Keep system packages and dependencies updated
5. **Backup database** - Regular automated backups
6. **Monitor logs** - Set up log aggregation and monitoring
7. **Limit runner access** - Use GitHub runner groups and restrict permissions

## Production Checklist

- [ ] LXC container created with sufficient resources
- [ ] System packages updated
- [ ] Node.js 22+ installed
- [ ] Docker and Docker Compose installed
- [ ] GitHub self-hosted runner configured and running
- [ ] Repository cloned
- [ ] Environment variables configured
- [ ] Docker network created
- [ ] Application built and deployed
- [ ] Frontend accessible on port 3000
- [ ] API accessible on port 3001
- [ ] Authentication tested
- [ ] GitHub Actions workflows tested
- [ ] SSL/TLS configured (production)
- [ ] Firewall configured
- [ ] Monitoring set up
- [ ] Backups configured

---

For questions or issues, please contact: [kontakt@sysnordic.no](mailto:kontakt@sysnordic.no)

Visit: [sysnordic.no](https://www.sysnordic.no)
