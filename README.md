[![Sysnordic - Oslo-basert SOC as a Service](apps/docs/static/img/o2s-gh-cover.png)](https://www.sysnordic.no)

# Sysnordic

**Oslo-basert SOC as a Service**

**Sysnordic** leverer kontinuerlig overvåking, hendelseshåndtering, digital etterforskning og styringsstøtte for virksomheter som må møte krav fra NSM, NIS2, ISO/IEC 27001 og andre rammeverk.

## 🚀 Våre tjenester

- **24/7 Overvåking** – Kontinuerlig overvåking med tydelig prioritering og triage
- **Incident Response** – Hendelseshåndtering fra deteksjon til gjenoppretting
- **Digital Forensics** – Strukturert innsamling og analyse med beviskjede
- **Compliance** – NSM, NIS2, ISO/IEC 27001 støtte og dokumentasjon
- **Integrasjon** – SIEM, SOAR, EDR, og sky-plattformer

## 📖 Tjenesteoversikt

### SOC as a Service
24/7 overvåking og deteksjon med strukturert triage, eskalering og kontinuerlig forbedring. Vi tilpasser datakilder, use-cases og playbooks til virksomhetens risiko og drift.

### Incident Response
Når det haster: vi hjelper dere å avgrense, rydde opp og gjenopprette — med sporbarhet og læring.

### Digital etterforskning (Forensics)
Strukturert innsamling og analyse for å forstå hva som skjedde — og dokumentere det som kan dokumenteres.

### Compliance & styring
Fra «krav på papir» til tiltak i drift: vi oversetter rammeverk til praktiske kontroller.

## 🔧 Kontakt

For mer informasjon om våre tjenester:

- **E-post:** [kontakt@sysnordic.no](mailto:kontakt@sysnordic.no)
- **Nettside:** [sysnordic.no](https://www.sysnordic.no)

## 📜 Rammeverk vi støtter

- **NSM** – Prinsipper, grunnsikring og veiledere tilpasset norsk kontekst
- **NIS2** – Støtte til styring, rapportering, risikohåndtering og leverandørkrav
- **ISO/IEC 27001** – ISMS, kontroller, risikovurdering, interne revisjoner og forbedringsløp

## 🛡️ Våre prinsipper

- Målbar leveranse – Rapporter, KPI-er og dokumentasjon som tåler revisjon
- Rask deteksjon – Kontekst, triage og prioritering uten støy
- Enterprise-kvalitet – Med presisjon og sikkerhetsfokus


## 🤝 Om oss

Sysnordic er en Oslo-basert sikkerhetspartner med fokus på leveranse. Vi bygger moderne sikkerhetsoperasjoner og compliance-programmer for norske virksomheter.

## 🚢 Deployment

This project can be deployed in multiple ways:

- **[Quick Start Guide](QUICK_START.md)** - Fast deployment reference
- **[Complete Deployment Guide](DEPLOYMENT.md)** - Detailed step-by-step instructions
- **Docker Compose** - See [docker-compose.yml](docker-compose.yml) or [deployment docs](apps/docs/docs/guides/deployment/docker.md)
- **GitHub Self-Hosted Runner** - See [GitHub Runner Guide](apps/docs/docs/guides/deployment/github-runner.md)
- **Vercel** - See [Vercel deployment guide](apps/docs/docs/guides/deployment/vercel.md)

### Quick Deploy with Docker

```bash
# Install prerequisites: Docker, Docker Compose, Node.js 22+

# Clone repository
git clone https://github.com/Mixie-12/openselfservice-IT.git
cd openselfservice-IT

# Create Docker network
docker network create app_network

# Deploy
docker compose up -d --build

# Access:
# Frontend: http://localhost:3000
# API: http://localhost:3001/api
```

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contact e-mail
[kontakt@sysnordic.no](mailto:kontakt@sysnordic.no)

## 📩 Nettside

- Website: [sysnordic.no](https://www.sysnordic.no)

## 📜 License

This project is based on Open Self Service, licensed under the **MIT License**.
