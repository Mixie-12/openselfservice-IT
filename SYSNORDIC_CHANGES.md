# Sysnordic Rebranding Summary

This document summarizes the changes made to rebrand the Open Self Service repository for Sysnordic, an Oslo-based SOC as a Service provider.

## Overview

The repository has been transformed from a general-purpose customer self-service framework to a specialized cybersecurity services portal for Sysnordic, offering:
- 24/7 Security Monitoring (SOC as a Service)
- Incident Response
- Digital Forensics
- Compliance Support (NSM, NIS2, ISO/IEC 27001)

## Major Changes

### 1. Core Branding Updates

#### Configuration Files
- **docusaurus.config.ts**: Updated title, tagline, and custom fields to reflect Sysnordic branding
- **package.json** (root, frontend, docs): Changed package names from `@o2s/*` to `@sysnordic/*`

#### Documentation Site
- **Homepage** (`apps/docs/src/pages/index.tsx`): Complete rewrite with Sysnordic services
  - New hero section highlighting SOC as a Service
  - Service offerings grid (Monitoring, IR, Forensics, Compliance, Integration)
  - Process workflow (Onboarding → Detection & Response → Compliance → Continuous Improvement)
  - Norwegian language content

### 2. New Service Pages

Created four new Norwegian-language service pages:

#### Tjenester (Services) - `/tjenester`
- Comprehensive overview of all Sysnordic services
- Detailed descriptions of SOC as a Service, IR, Forensics, and Compliance
- Service packages (Starter, Professional, Enterprise)
- Contact CTA

#### Compliance - `/compliance`
- Framework support (NSM, NIS2, ISO/IEC 27001)
- Implementation methodology (Gap Analysis → Mapping → Implementation → Audit Readiness)
- Service tiers (Starter, Program, Audit Support)
- Core principles and deliverables

#### Om Oss (About) - `/om-oss`
- Company overview and approach
- Value propositions (Clear responsibility, Minimal friction, Enterprise quality, Terminal precision)
- Collaboration model
- Security principles (Data minimization, Traceability, Zero Trust, Least privilege)
- Terminal-style command section for brand personality

#### Contact - `/contact`
- Updated contact form with Norwegian labels
- Changed email from `contact@openselfservice.com` to `kontakt@sysnordic.no`
- Updated consent text for GDPR compliance
- Norwegian language throughout

### 3. README Files

Updated all README files:
- **Main README.md**: Complete rewrite focusing on Sysnordic services and offerings
- **apps/frontend/README.md**: Simplified with Sysnordic branding
- **apps/docs/README.md**: Updated with Sysnordic contact information

### 4. Meta Tags and SEO

- **Frontend layout**: Changed `apple-mobile-web-app-title` to "Sysnordic"
- **Docusaurus config**: Updated all meta information for Norwegian market and cybersecurity focus

## Contact Information

All contact references updated:
- Email: `kontakt@sysnordic.no`
- Website: `sysnordic.no`

## Technical Notes

- All Norwegian content uses proper Norwegian characters (å, ø, æ)
- Service pages follow consistent layout and component structure
- Brand personality maintains "terminal/hacker vibe" while remaining enterprise-professional
- All changes maintain compatibility with existing Next.js and Docusaurus infrastructure

## Files Modified

- README.md
- package.json
- apps/docs/docusaurus.config.ts
- apps/docs/package.json
- apps/docs/README.md
- apps/docs/src/pages/index.tsx
- apps/docs/src/pages/contact/index.tsx
- apps/frontend/package.json
- apps/frontend/README.md
- apps/frontend/src/app/[locale]/layout.tsx

## Files Created

- apps/docs/src/pages/tjenester/index.tsx
- apps/docs/src/pages/compliance/index.tsx
- apps/docs/src/pages/om-oss/index.tsx

## Next Steps

To complete the deployment:
1. Install dependencies: `npm install` (note: some external API integrations may fail due to network restrictions - this is expected)
2. Build the documentation site: `cd apps/docs && npm run build`
3. Deploy to your hosting platform
4. Update DNS to point to your deployment
5. Consider updating/replacing logo and brand assets in `apps/docs/static/img/`
6. Review and potentially remove unused product pages in `apps/docs/src/pages/product/`

## License

This project is based on Open Self Service, which is licensed under the MIT License.
