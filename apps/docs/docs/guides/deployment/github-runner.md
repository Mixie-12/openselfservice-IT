---
title: Deploy with GitHub Self-Hosted Runner
description: Complete guide for deploying Open Self Service using a GitHub self-hosted runner on LXC container.
---

# Deploy with GitHub Self-Hosted Runner

This guide walks you through deploying Open Self Service on an LXC container with a GitHub self-hosted runner. This setup is ideal for running your own infrastructure while leveraging GitHub Actions for CI/CD.

## Overview

This deployment method combines:

- **LXC Container**: Lightweight virtualization for isolated environment
- **GitHub Self-Hosted Runner**: Run GitHub Actions on your infrastructure
- **Docker Compose**: Containerized deployment for production

## Prerequisites

- Proxmox VE or LXC-compatible host
- Basic Linux and Docker knowledge
- GitHub repository access
- 8GB+ RAM, 4+ CPU cores, 50GB+ storage

## Quick Start

For experienced users, see the [Quick Start Guide](https://github.com/Mixie-12/openselfservice-IT/blob/main/QUICK_START.md) in the repository root.

For detailed step-by-step instructions, see the [Complete Deployment Guide](https://github.com/Mixie-12/openselfservice-IT/blob/main/DEPLOYMENT.md).

## Deployment Steps

### 1. Prepare LXC Container

Create an LXC container with:

- OS: Ubuntu 22.04 LTS or Debian 12
- RAM: 8GB minimum (16GB recommended)
- CPU: 4 cores minimum
- Storage: 50GB minimum

### 2. Install Dependencies

Install required system packages:

```bash
apt update && apt upgrade -y
apt install -y curl wget git build-essential python3
```

### 3. Install Node.js 22+

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
apt install -y nodejs
```

Verify installation:

```bash
node --version  # Should be v22.x.x or higher
```

### 4. Install Docker

```bash
# Install Docker Engine and Docker Compose
curl -fsSL https://get.docker.com | sh

# Add user to docker group
usermod -aG docker $USER
```

### 5. Configure GitHub Runner

1. Go to repository Settings → Actions → Runners
2. Click "New self-hosted runner"
3. Follow provided instructions:

```bash
# Download and configure runner
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure with token from GitHub
./config.sh --url https://github.com/Mixie-12/openselfservice-IT --token YOUR_TOKEN

# Install as service
sudo ./svc.sh install
sudo ./svc.sh start
```

### 6. Deploy Application

```bash
# Clone repository
git clone https://github.com/Mixie-12/openselfservice-IT.git
cd openselfservice-IT

# Install dependencies
npm ci

# Create Docker network
docker network create app_network

# Build and start services
docker compose up -d --build
```

### 7. Configure Environment

Update `docker-compose.yml` with production values:

- Replace `localhost` with your server IP/domain
- Generate new secrets: `openssl rand -base64 32`
- Configure external integrations (optional)

### 8. Verify Deployment

```bash
# Check container status
docker compose ps

# View logs
docker compose logs -f

# Test endpoints
curl http://localhost:3000      # Frontend
curl http://localhost:3001/api  # API
```

## Application Access

- **Frontend**: http://your-server-ip:3000
- **API**: http://your-server-ip:3001/api

Default credentials:
- Username: `jane@example.com`
- Password: `admin`

## Architecture

```
┌─────────────────────────────────────────┐
│         LXC Container                    │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   GitHub Self-Hosted Runner        │ │
│  │   (CI/CD Execution)                │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   Docker Network (app_network)     │ │
│  │                                    │ │
│  │  ┌──────────────┐  ┌────────────┐ │ │
│  │  │   Frontend   │  │    API     │ │ │
│  │  │  (Next.js)   │  │  (NestJS)  │ │ │
│  │  │   :3000      │  │   :3001    │ │ │
│  │  └──────────────┘  └────────────┘ │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   Node.js 22 + npm                 │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   Docker Engine + Compose          │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## GitHub Actions Integration

Your self-hosted runner will automatically execute GitHub Actions workflows. The repository includes two main workflows:

### CI Workflow (Pull Requests)

**File**: `.github/workflows/ci-self-hosted.yaml`

Runs automatically on pull requests to:
- Install dependencies
- Run linting and formatting checks
- Build the application
- Execute tests
- Provide test summaries

### Deployment Workflow (Main Branch)

**File**: `.github/workflows/deploy-self-hosted.yaml`

Runs automatically on push to `main` branch to:
- Build the application
- Create default environment variables if not provided
- Deploy using Docker Compose or Node.js (PM2)
- Run health checks
- Generate deployment summaries

#### Automatic Environment Configuration

The deployment workflow automatically creates production environment files with sensible defaults if they don't exist:

- **Frontend** (`apps/frontend/.env.production`):
  - Detects server IP automatically
  - Uses provided GitHub secrets or defaults
  - Configures authentication and API URLs

- **API** (`apps/api-harmonization/.env.production`):
  - Sets production logging configuration
  - Configures integrations from secrets
  - Uses Norwegian locale by default

#### Deployment Modes

You can manually trigger deployment with different modes:

1. **Docker Mode** (default):
```yaml
docker compose up -d --build
```

2. **Node.js Mode** (PM2):
```bash
# Uses PM2 process manager for Node.js deployment
pm2 start apps/frontend
pm2 start apps/api-harmonization
```

To manually trigger a deployment:
1. Go to **Actions** → **Deploy to Self-Hosted Runner**
2. Click **Run workflow**
3. Select deployment mode (docker or nodejs)

#### Required GitHub Secrets

Configure these secrets in your repository settings for production deployment:

**Authentication**:
- `AUTH_SECRET` - Authentication secret (generate with `openssl rand -base64 32`)
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` - Google OAuth (optional)
- `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` - GitHub OAuth (optional)

**Integrations** (optional):
- `CMS_STRAPI_BASE_URL` - Strapi CMS URL
- `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY` - Algolia search
- `MEDUSAJS_BASE_URL`, `MEDUSAJS_PUBLISHABLE_API_KEY`, `MEDUSAJS_ADMIN_API_KEY` - Medusa e-commerce
- `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT`, `CACHE_REDIS_PASS` - Redis caching
- `ZENDESK_API_URL`, `ZENDESK_API_TOKEN`, `ZENDESK_TOPIC_FIELD_ID` - Zendesk integration

If secrets are not provided, the workflow uses sensible defaults suitable for development/testing.

### Example Workflow Usage

Basic example targeting self-hosted runner:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: [self-hosted, linux, docker]
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: |
          docker compose up -d --build
```

## Maintenance

### Update Application

```bash
cd openselfservice-IT
git pull origin main
docker compose up -d --build
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend
docker compose logs -f api-harmonization
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart frontend
```

### Monitor Runner

```bash
cd ~/actions-runner
sudo ./svc.sh status
```

## Troubleshooting

### Runner Not Connecting

```bash
# Check runner status
cd ~/actions-runner
sudo ./svc.sh status

# View logs
sudo journalctl -u actions.runner.* -f

# Restart runner
sudo ./svc.sh restart
```

### Container Build Fails

```bash
# Clean Docker cache
docker builder prune -a

# Rebuild from scratch
docker compose down
docker compose up -d --build --force-recreate
```

### Port Conflicts

```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :3001

# Update ports in docker-compose.yml or stop conflicting service
```

## Security Considerations

1. **Firewall**: Configure firewall to restrict access
2. **SSL/TLS**: Set up HTTPS with Let's Encrypt
3. **Secrets**: Never commit secrets to repository
4. **Updates**: Keep system and packages updated
5. **Backups**: Regular database and configuration backups
6. **Access Control**: Limit GitHub runner permissions

## Performance Tuning

- **Production Database**: Use PostgreSQL instead of SQLite
- **Caching**: Enable Redis for API caching
- **Reverse Proxy**: Use NGINX for SSL termination and load balancing
- **Monitoring**: Set up Prometheus and Grafana
- **Resource Limits**: Configure Docker memory and CPU limits

## Additional Resources

- [Complete Deployment Guide](https://github.com/Mixie-12/openselfservice-IT/blob/main/DEPLOYMENT.md) - Detailed instructions
- [Quick Start Guide](https://github.com/Mixie-12/openselfservice-IT/blob/main/QUICK_START.md) - Fast reference
- [Docker Deployment](./docker.md) - Docker-specific details
- [Vercel Deployment](./vercel.md) - Vercel alternative

## Support

For assistance:

- Email: [kontakt@sysnordic.no](mailto:kontakt@sysnordic.no)
- Website: [sysnordic.no](https://www.sysnordic.no)
- GitHub Issues: Report bugs and request features
