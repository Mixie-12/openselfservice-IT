import type { ReactNode } from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { HeroBannerSection } from '@site/src/components/HeroBannerSection';
import { HomepageArchitectureSection } from '@site/src/components/HomepageArchitectureSection';
import { HomepageFeaturesSection } from '@site/src/components/HomepageFeaturesSection';
import { HomepageStartersSection } from '@site/src/components/HomepageStartersSection';
import { SubscribeSection } from '@site/src/components/SubscribeSection';
import { Body } from '@site/src/components/Typography';

import Layout from '@theme/Layout';

import styles from './main.module.scss';

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div>
            <Layout title={`${siteConfig.customFields.fullPageTitle}`}>
                <div className={styles.linearGradient}>
                    <div style={{ overflow: 'hidden' }}>
                        <div className={styles.gradientWrapper}>
                            <div className={styles.gradientCircleGreen} />
                            <div className={styles.gradientCircleBlue} />
                            <main className={styles.mainContentWrapper}>
                                <HeroBannerSection
                                    heading={
                                        <>
                                            <br />
                                            Oslo-basert
                                            <span className="text-highlighted"> SOC as a Service</span>
                                            <br />
                                            24/7 overvåking • deteksjon • respons
                                            <br />
                                        </>
                                    }
                                    description={
                                        <Body>
                                            <b>Sysnordic</b> leverer kontinuerlig overvåking, hendelseshåndtering, 
                                            digital etterforskning og styringsstøtte for virksomheter som må møte 
                                            krav fra NSM, NIS2, ISO/IEC 27001 og andre rammeverk.
                                        </Body>
                                    }
                                    cliCommand="sysnordic://security-ops"
                                    mainLink={{
                                        text: 'Se tjenester',
                                        url: '/tjenester',
                                    }}
                                    secondaryLink={{
                                        text: 'Kontakt oss',
                                        url: '/contact',
                                    }}
                                    heroImage={{
                                        url: '/img/homepage/banner.png',
                                        alt: 'Security Operations Center illustration',
                                    }}
                                />

                                <div className="flex flex-col gap-y-40 pb-16">
                                    <section className="px-4 scroll-m-[120px]">
                                        <div className="max-w-4xl mx-auto text-center">
                                            <h2 className="text-3xl font-bold mb-6">Våre tjenester</h2>
                                            <Body>
                                                Fra «hacker-vibe» til enterprise — uten å miste presisjon. 
                                                Vi kombinerer moderne sikkerhetsmetodikk med tydelig dokumentasjon 
                                                og forankring i lov- og rammeverkskrav.
                                            </Body>
                                        </div>
                                    </section>

                                    <section className="px-4">
                                        <div className="max-w-6xl mx-auto">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                <div className="p-6 rounded-lg border">
                                                    <h3 className="text-xl font-bold mb-4">🛰️ Overvåking & deteksjon</h3>
                                                    <Body>
                                                        24/7 • triage • hunting. Kontinuerlig overvåking med tydelig prioritering. 
                                                        Vi skiller signal fra støy og gir konkrete anbefalinger.
                                                    </Body>
                                                </div>
                                                <div className="p-6 rounded-lg border">
                                                    <h3 className="text-xl font-bold mb-4">🧯 Hendelseshåndtering</h3>
                                                    <Body>
                                                        IR • beredskap • runbooks. Fra første varsling til gjenoppretting: 
                                                        avgrensning, eradikering, læring og forbedring av beredskap.
                                                    </Body>
                                                </div>
                                                <div className="p-6 rounded-lg border">
                                                    <h3 className="text-xl font-bold mb-4">🔎 Digital forensics</h3>
                                                    <Body>
                                                        Beviskjede • analyse • rapport. Strukturert innsamling og analyse 
                                                        med fokus på sporbarhet og dokumentasjon.
                                                    </Body>
                                                </div>
                                                <div className="p-6 rounded-lg border">
                                                    <h3 className="text-xl font-bold mb-4">📜 Compliance & styring</h3>
                                                    <Body>
                                                        NSM • NIS2 • ISO 27001. Vi kobler sikkerhetstiltak til krav og kontrollmål, 
                                                        og leverer sporbar dokumentasjon som støtter revisjon.
                                                    </Body>
                                                </div>
                                                <div className="p-6 rounded-lg border">
                                                    <h3 className="text-xl font-bold mb-4">🧩 Integrasjon & forbedring</h3>
                                                    <Body>
                                                        SIEM • SOAR • EDR • sky. Vi møter dere der dere er: verktøy, logger 
                                                        og prosesser — og bygger stegvis modenhet uten å bremse drift.
                                                    </Body>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="px-4">
                                        <div className="max-w-4xl mx-auto">
                                            <h2 className="text-3xl font-bold mb-6 text-center">Hvordan leveransen fungerer</h2>
                                            <Body className="text-center mb-8">
                                                Standardisert, men tilpasset: vi etablerer grunnmur, kobler på datakilder, 
                                                og setter opp playbooks. Deretter jobber vi kontinuerlig med forbedring og rapportering.
                                            </Body>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-6">
                                                    <h4 className="text-lg font-bold mb-2">01 — Onboarding</h4>
                                                    <Body>Tilgang, logging, datakilder, avklarte roller og eskaleringsløp.</Body>
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="text-lg font-bold mb-2">02 — Deteksjon & respons</h4>
                                                    <Body>Regler, triage, IR-runbooks og hendelseshåndtering.</Body>
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="text-lg font-bold mb-2">03 — Compliance & rapportering</h4>
                                                    <Body>Kontroller, evidens, KPI-er, revisjonsklar dokumentasjon.</Body>
                                                </div>
                                                <div className="p-6">
                                                    <h4 className="text-lg font-bold mb-2">04 — Kontinuerlig forbedring</h4>
                                                    <Body>Threat hunting, læring etter hendelser, hardening og modenhet.</Body>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>

                    <div className="section-gradient-1 py-40 mb-0!">
                        <section className="mb-0! px-4 max-w-[1080px] mx-auto">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-6">Klar for en moden SOC-leveranse?</h2>
                                <Body>
                                    Vi starter gjerne med en kort avklaring (30 min) og skisserer anbefalt leveranse, 
                                    datakilder og forventet effekt.
                                </Body>
                                <div className="mt-8">
                                    <a href="mailto:kontakt@sysnordic.no" className="text-xl font-bold">
                                        kontakt@sysnordic.no
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
