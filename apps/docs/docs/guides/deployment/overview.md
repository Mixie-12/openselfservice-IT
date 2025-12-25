---
title: Overview
description: How to deploy Open Self Service using Docker, Vercel, or GitHub Self-Hosted Runner.
---

This guide walks you through deploying Open Self Service in production.

## Deployment Options

- **Docker**: Build and run the `frontend` and `api-harmonization` services locally or on your own infrastructure.
- **Vercel**: Deploy the `frontend` app with a monorepo setup. The API should be deployed via Docker or another container platform.
- **GitHub Self-Hosted Runner**: Deploy on LXC container with GitHub Actions integration for automated CI/CD.

## Get Started

- **Docker**: See [Deploy with Docker](./docker)
- **Vercel**: See [Deploy on Vercel](./vercel)
- **GitHub Runner**: See [Deploy with GitHub Self-Hosted Runner](./github-runner)

## Which Deployment Method to Choose?

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Docker Compose** | Self-hosted production | Full control, cost-effective, easy to manage | Requires server management |
| **Vercel** | Frontend-only, quick deploys | Zero-config, auto-scaling, CDN | API must be deployed separately |
| **GitHub Runner** | CI/CD integration, automated workflows | Automated deployments, custom workflows | Requires runner maintenance |

## Prerequisites

All deployment methods require:

- Node.js 22 or higher
- Docker 24+ (for containerized deployments)
- Basic knowledge of the deployment platform


