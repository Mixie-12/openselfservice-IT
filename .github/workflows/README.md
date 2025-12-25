# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the Sysnordic Self Service application.

## Workflows Overview

### 🚀 Production Deployment

**File**: `deploy-self-hosted.yaml`

**Trigger**: 
- Automatically on push to `main` branch
- Manually via workflow dispatch

**Runner**: Self-hosted Linux runner

**Purpose**: Deploys the application to production environment

**Features**:
- ✅ Automatic environment variable creation with defaults
- ✅ Support for Docker Compose and Node.js (PM2) deployment modes
- ✅ Health checks after deployment
- ✅ Deployment summaries with access URLs
- ✅ Automatic cleanup of old Docker resources

**Deployment Modes**:
1. **Docker** (default) - Containerized deployment with Docker Compose
2. **Node.js** - Direct deployment using PM2 process manager

**Required Secrets** (optional, uses defaults if not provided):
- `AUTH_SECRET` - Authentication secret
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` - Google OAuth
- `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` - GitHub OAuth
- Integration secrets: Strapi, Algolia, Medusa, Redis, Zendesk

**Environment Variables Created**:
- `apps/frontend/.env.production` - Frontend configuration
- `apps/api-harmonization/.env.production` - API configuration

**Manual Trigger**:
```bash
# Via GitHub UI:
# Actions → Deploy to Self-Hosted Runner → Run workflow → Select mode
```

---

### 🧪 Continuous Integration

**File**: `ci-self-hosted.yaml`

**Trigger**: 
- Pull requests (opened, synchronized, reopened)
- Push to non-main branches

**Runner**: Self-hosted Linux runner

**Purpose**: Validates code quality and runs tests

**Steps**:
- Install dependencies
- Run linting
- Check code formatting
- Build application
- Run test suite
- Generate test summary

**Skip Conditions**:
- Documentation-only changes (*.md files)
- Duplicate runs (automatic cancellation)

---

### 📦 Package Release

**File**: `release.yaml` (formerly `deploy-dev.yaml`)

**Trigger**: Push to `main` branch

**Runner**: GitHub-hosted Ubuntu runner

**Purpose**: Publishes packages to npm registry

**Features**:
- Changeset-based versioning
- npm package publishing
- Automated release PR creation

**Required Secrets**:
- `NPM_TOKEN` - npm registry authentication
- `TURBO_TOKEN` - Turborepo remote caching (optional)

---

### 🔍 Preview Deployment

**File**: `preview.yaml`

**Trigger**: 
- Push to `main` branch
- Pull requests

**Runner**: GitHub-hosted Ubuntu runner

**Purpose**: Deploy preview versions to Vercel

**Features**:
- Automatic change detection
- Vercel preview deployments
- Targets documentation app

**Required Secrets**:
- `VERCEL_ACCESS_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_DOCS_PROJECT_ID` - Vercel project ID

---

### 🔄 Changed Packages Detection

**File**: `changed-packages.yaml`

**Trigger**: Called by other workflows

**Purpose**: Determines which packages changed since last release

**Usage**: Used by preview workflow to optimize deployments

---

## Workflow Configuration

### Setting Up Secrets

Configure secrets in: **Repository Settings → Secrets and variables → Actions**

**Required for Production Deployment**:
```
AUTH_SECRET=<generate with: openssl rand -base64 32>
```

**Optional Integrations**:
```
AUTH_GOOGLE_ID=<google-oauth-client-id>
AUTH_GOOGLE_SECRET=<google-oauth-secret>
AUTH_GITHUB_ID=<github-oauth-client-id>
AUTH_GITHUB_SECRET=<github-oauth-secret>

CMS_STRAPI_BASE_URL=<strapi-url>
ALGOLIA_APP_ID=<algolia-app-id>
ALGOLIA_API_KEY=<algolia-api-key>
MEDUSAJS_BASE_URL=<medusa-url>
MEDUSAJS_PUBLISHABLE_API_KEY=<medusa-key>
MEDUSAJS_ADMIN_API_KEY=<medusa-admin-key>

CACHE_ENABLED=true
CACHE_REDIS_HOST=<redis-host>
CACHE_REDIS_PORT=6379
CACHE_REDIS_PASS=<redis-password>

ZENDESK_API_URL=<zendesk-url>
ZENDESK_API_TOKEN=<zendesk-token>
ZENDESK_TOPIC_FIELD_ID=<zendesk-field-id>
```

**Optional for Package Release**:
```
NPM_TOKEN=<npm-access-token>
TURBO_TOKEN=<turborepo-token>
```

**Optional for Vercel Previews**:
```
VERCEL_ACCESS_TOKEN=<vercel-token>
VERCEL_ORG_ID=<org-id>
VERCEL_DOCS_PROJECT_ID=<project-id>
```

### Setting Up Self-Hosted Runner

1. **Install Runner**:
   ```bash
   mkdir -p ~/actions-runner && cd ~/actions-runner
   curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
     https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
   tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz
   ```

2. **Configure Runner**:
   ```bash
   ./config.sh --url https://github.com/Mixie-12/openselfservice-IT --token YOUR_TOKEN
   # Add labels: linux, docker (these are used in workflow runs-on)
   ```

3. **Install as Service**:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

4. **Verify Runner**:
   - Go to **Settings → Actions → Runners**
   - Runner should show as "Idle" or "Active"

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for complete setup instructions.

## Workflow Execution

### Automatic Triggers

**On Pull Request**:
- `ci-self-hosted.yaml` runs tests and linting
- `preview.yaml` may deploy preview (if configured)

**On Push to Main**:
- `deploy-self-hosted.yaml` deploys to production
- `release.yaml` publishes packages (if changesets exist)
- `preview.yaml` updates preview deployment

### Manual Triggers

**Deploy to Production**:
1. Go to **Actions** tab
2. Select **Deploy to Self-Hosted Runner**
3. Click **Run workflow**
4. Choose deployment mode (docker/nodejs)
5. Click **Run workflow** button

### Monitoring Workflows

**View Workflow Runs**:
- **Actions** tab → Select workflow → View run details

**Deployment Summary**:
- Each deployment creates a summary with:
  - Commit and branch information
  - Server IP and access URLs
  - Deployment mode
  - Default credentials

**Runner Logs**:
```bash
cd ~/actions-runner
sudo journalctl -u actions.runner.* -f
```

## Default Environment Variables

When no secrets are provided, workflows use these defaults:

**Frontend**:
- `PORT`: 3000
- `NEXT_PUBLIC_DEFAULT_LOCALE`: no (Norwegian)
- `NEXT_PUBLIC_SUPPORTED_LOCALES`: en,de,pl,no
- `AUTH_SECRET`: Default development secret (⚠️ Change in production!)
- `AUTH_DATABASE_URL`: file:./prod.db (SQLite)

**API**:
- `PORT`: 3001
- `NODE_ENV`: production
- `DEFAULT_LOCALE`: no (Norwegian)
- `DEFAULT_CURRENCY`: NOK
- `LOG_LEVEL`: info
- `LOG_FORMAT`: json

**URLs**:
- Automatically detected server IP
- Frontend: `http://<server-ip>:3000`
- API: `http://<server-ip>:3001/api`

## Troubleshooting

### Workflow Not Running on Self-Hosted Runner

**Check Runner Labels**:
```yaml
runs-on: [self-hosted, linux]  # Must match runner labels
```

**Verify Runner Status**:
```bash
cd ~/actions-runner
sudo ./svc.sh status
```

### Deployment Fails

**Check Docker**:
```bash
docker --version
docker compose version
sudo systemctl status docker
```

**Check Logs**:
- Workflow logs in GitHub Actions tab
- Container logs: `docker compose logs -f`
- Runner logs: `sudo journalctl -u actions.runner.* -f`

**Clean Docker Resources**:
```bash
docker compose down
docker system prune -a
docker compose up -d --build
```

### Environment Variables Not Applied

**Manual Override**:
- Create `apps/frontend/.env.production` before workflow runs
- Create `apps/api-harmonization/.env.production` before workflow runs
- Workflow will skip creating defaults if files exist

**Check Secrets**:
- Repository Settings → Secrets and variables → Actions
- Verify secret names match workflow file

### Build Failures

**Clear Build Cache**:
```bash
npm run clean
npm ci
npm run build
```

**Check Node.js Version**:
```bash
node --version  # Should be 22+
```

## Best Practices

1. **Always set AUTH_SECRET** in production
2. **Use environment-specific secrets** for different deployments
3. **Monitor workflow runs** for failures
4. **Keep runner updated** and running
5. **Review deployment summaries** after each deploy
6. **Test in development** before deploying to production
7. **Back up databases** before deployments
8. **Use Docker mode** for consistency
9. **Set up monitoring** for production deployments
10. **Review logs regularly** for issues

## Additional Resources

- [Deployment Guide](../../DEPLOYMENT.md)
- [Quick Start Guide](../../QUICK_START.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Self-Hosted Runners Guide](https://docs.github.com/en/actions/hosting-your-own-runners)

---

For questions or issues, contact: [kontakt@sysnordic.no](mailto:kontakt@sysnordic.no)
