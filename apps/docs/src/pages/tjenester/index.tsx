import type { ReactNode } from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { Body, H2, H3 } from '@site/src/components/Typography';

import Layout from '@theme/Layout';

export default function Tjenester(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title="Tjenester - Sysnordic" description="Alt du trenger for drift, respons og dokumentert sikkerhet">
            <div className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Tjenester</h1>
                    <Body className="text-xl">
                        Alt du trenger for drift, respons og dokumentert sikkerhet.
                    </Body>
                    <Body className="mt-4">
                        Sysnordic tilbyr en helhetlig portefølje for sikkerhetsoperasjoner og etterlevelse — 
                        levert med tydelig ansvar, klare SLA-er og målbar verdi.
                    </Body>
                </div>

                <div className="space-y-12">
                    {/* SOC as a Service */}
                    <section className="border-l-4 border-blue-500 pl-6">
                        <H2>SOC as a Service</H2>
                        <Body className="mb-4">
                            24/7 overvåking og deteksjon med strukturert triage, eskalering og kontinuerlig forbedring. 
                            Vi tilpasser datakilder, use-cases og playbooks til virksomhetens risiko og drift.
                        </Body>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-gray-50 rounded">
                                <p className="font-semibold">✓ Integrasjon av loggkilder</p>
                                <Body className="text-sm">Sky, on-prem, identitet, nettverk, endepunkter</Body>
                            </div>
                            <div className="p-4 bg-gray-50 rounded">
                                <p className="font-semibold">✓ Deteksjonsregler og use-case bibliotek</p>
                                <Body className="text-sm">Tilpasset din virksomhets risikoprofil</Body>
                            </div>
                            <div className="p-4 bg-gray-50 rounded">
                                <p className="font-semibold">✓ Threat hunting og proaktiv forbedring</p>
                                <Body className="text-sm">Kontinuerlig søk etter trusler</Body>
                            </div>
                            <div className="p-4 bg-gray-50 rounded">
                                <p className="font-semibold">✓ Rapportering, KPI-er og ledelsesoversikt</p>
                                <Body className="text-sm">Målbar verdi og transparent kommunikasjon</Body>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4 flex-wrap">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SIEM</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SOAR</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">EDR</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cloud</span>
                        </div>
                    </section>

                    {/* Incident Response */}
                    <section className="border-l-4 border-red-500 pl-6">
                        <H2>Incident Response</H2>
                        <Body className="mb-4">
                            Når det haster: vi hjelper dere å avgrense, rydde opp og gjenopprette — med sporbarhet og læring.
                        </Body>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Beredskap og responsplan (roller, eskalering, kommunikasjonsløp)</li>
                            <li>Hendelseshåndtering: avgrensning, eradikering, gjenoppretting</li>
                            <li>Post-incident review og forbedringsplan</li>
                            <li>Øvelser (table-top) og modenhetsløft</li>
                        </ul>
                        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                            <Body className="font-semibold">Tips:</Body>
                            <Body>Kombiner IR med SOC for raskere deteksjon og bedre beslutningsgrunnlag.</Body>
                        </div>
                    </section>

                    {/* Digital Forensics */}
                    <section className="border-l-4 border-purple-500 pl-6">
                        <H2>Digital etterforskning (Forensics)</H2>
                        <Body className="mb-4">
                            Strukturert innsamling og analyse for å forstå hva som skjedde — og dokumentere det som kan dokumenteres.
                        </Body>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Bevisinnsamling og sikring av beviskjede (chain of custody)</li>
                            <li>Tidslinjer, artefaktanalyse og årsaksforståelse</li>
                            <li>Støtte til intern/ekstern rapportering</li>
                            <li>Råd om logging og sporbarhet for fremtidige hendelser</li>
                        </ul>
                    </section>

                    {/* Rådgivning og Compliance */}
                    <section className="border-l-4 border-green-500 pl-6">
                        <H2>Rådgivning, styring og sikkerhetsprogram</H2>
                        <Body className="mb-4">
                            Fra «krav på papir» til tiltak i drift: vi oversetter rammeverk til praktiske kontroller.
                        </Body>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Risikovurderinger og kontrollmapping</li>
                            <li>Policy/standarder, prosedyrer og evidens</li>
                            <li>Leverandør- og tredjepartsoppfølging</li>
                            <li>Modenhetsmåling og prioriteringsplan</li>
                        </ul>
                        <div className="mt-4 flex gap-4 flex-wrap">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">NSM</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">NIS2</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">ISO/IEC 27001</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Personvern (ved behov)</span>
                        </div>
                    </section>

                    {/* Pakker */}
                    <section className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <H2 className="mb-4">Pakker som passer modenhet</H2>
                        <Body className="mb-6">
                            Start enkelt og bygg videre. Vi kan levere som fast tjeneste, prosjekt, eller kombinasjon.
                        </Body>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded shadow">
                                <H3>Starter</H3>
                                <Body>Grunnleggende overvåking og beredskap</Body>
                            </div>
                            <div className="bg-white p-6 rounded shadow">
                                <H3>Professional</H3>
                                <Body>Full SOC-leveranse med compliance</Body>
                            </div>
                            <div className="bg-white p-6 rounded shadow">
                                <H3>Enterprise</H3>
                                <Body>Dedikert team og tilpasset leveranse</Body>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center mt-12 p-8 bg-blue-600 text-white rounded-lg">
                        <H2 className="text-white mb-4">Klar til å komme i gang?</H2>
                        <Body className="text-white mb-6">
                            Vi starter gjerne med en kort avklaring (30 min) og skisserer anbefalt leveranse, 
                            datakilder og forventet effekt.
                        </Body>
                        <a 
                            href="mailto:kontakt@sysnordic.no" 
                            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition"
                        >
                            Kontakt oss
                        </a>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
