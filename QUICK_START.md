# Quick Start Guide - Deployment

This is a condensed version of the full [deployment guide](DEPLOYMENT.md). Use this for quick reference.

## Prerequisites

- LXC container with Ubuntu 22.04/Debian 12
- 8GB RAM, 4 CPU cores, 50GB storage
- Internet connectivity

## Quick Setup Commands

### 1. Initial Setup

```bash
# Update system
apt update && apt upgrade -y
apt install -y curl wget git vim build-essential python3

# Create user
adduser sysnordic
usermod -aG sudo sysnordic
su - sysnordic
```

### 2. Install Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Verify v22+
```

### 3. Install Docker

```bash
# Add Docker repo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### 4. Setup GitHub Runner

```bash
# Create directory and download runner
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure (get token from GitHub Settings → Actions → Runners → New runner)
./config.sh --url https://github.com/Mixie-12/openselfservice-IT --token YOUR_TOKEN

# Install and start as service
sudo ./svc.sh install
sudo ./svc.sh start
```

### 5. Deploy Application

```bash
# Clone repository
cd ~
git clone https://github.com/Mixie-12/openselfservice-IT.git
cd openselfservice-IT

# Install dependencies
npm ci

# Create Docker network
docker network create app_network

# Deploy with Docker Compose
docker compose up -d --build
```

### 6. Verify

```bash
# Check containers
docker compose ps

# View logs
docker compose logs -f

# Test endpoints
curl http://localhost:3000      # Frontend
curl http://localhost:3001/api  # API
```

## Access Application

- **Frontend**: http://localhost:3000 or http://your-server-ip:3000
- **API**: http://localhost:3001/api
- **Default Login**: 
  - Username: `jane@example.com`
  - Password: `admin`

## Useful Commands

```bash
# View logs
docker compose logs -f

# Restart services
docker compose restart

# Stop services
docker compose down

# Rebuild and restart
docker compose up -d --build --force-recreate

# Check runner status
cd ~/actions-runner && sudo ./svc.sh status
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `sudo lsof -i :3000` or `:3001` to find process |
| Docker not running | `sudo systemctl start docker` |
| Runner offline | `cd ~/actions-runner && sudo ./svc.sh restart` |
| Build fails | `docker builder prune -a && docker compose up -d --build` |
| Out of memory | Add swap: `sudo fallocate -l 4G /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile` |

## Environment Configuration

Before deployment, update environment variables in:

- `docker-compose.yml` - Update URLs, secrets, and API keys
- Generate new `AUTH_SECRET`: `openssl rand -base64 32`
- Update `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_API_URL` with your server IP/domain

## Next Steps

- Configure SSL/TLS for production
- Set up monitoring and logging
- Configure database backups
- Review security settings
- See full [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

## Support

- Documentation: `apps/docs/`
- Email: kontakt@sysnordic.no
- Website: https://www.sysnordic.no
