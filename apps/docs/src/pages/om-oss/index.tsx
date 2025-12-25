import type { ReactNode } from 'react';

import { Body, H2, H3 } from '@site/src/components/Typography';

import Layout from '@theme/Layout';

export default function OmOss(): ReactNode {

    return (
        <Layout title="Om oss - Sysnordic" description="Oslo-basert sikkerhetspartner med fokus på leveranse">
            <div className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Om Sysnordic</h1>
                    <Body className="text-xl">
                        Oslo-basert sikkerhetspartner med fokus på leveranse.
                    </Body>
                    <Body className="mt-4">
                        Sysnordic bygger moderne sikkerhetsoperasjoner og compliance-programmer for norske virksomheter. 
                        Vi kombinerer praktisk sikkerhetsarbeid med struktur, sporbarhet og tydelig kommunikasjon.
                    </Body>
                </div>

                {/* Vår tilnærming */}
                <section className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <H2 className="mb-4 text-center">Vår tilnærming</H2>
                    <Body className="text-center text-lg font-semibold">
                        Målbar • transparent • revisjonsklar
                    </Body>
                </section>

                {/* Hvorfor Sysnordic */}
                <section className="mb-12">
                    <H2 className="mb-6">Hvorfor Sysnordic</H2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border-l-4 border-blue-500 shadow rounded">
                            <H3>Tydelig ansvar</H3>
                            <Body>
                                Klare eskaleringsløp og SLA-er. Du vet alltid hvem du skal kontakte, 
                                hva som er vårt ansvar og hva som forventes av dere.
                            </Body>
                        </div>
                        <div className="p-6 bg-white border-l-4 border-green-500 shadow rounded">
                            <H3>Minimal friksjon</H3>
                            <Body>
                                Vi integrerer med eksisterende verktøy og prosesser. Målet er å bygge 
                                modenhet uten å bremse driften eller kreve store endringer over natten.
                            </Body>
                        </div>
                        <div className="p-6 bg-white border-l-4 border-purple-500 shadow rounded">
                            <H3>Enterprise-kvalitet</H3>
                            <Body>
                                Rapporter og evidens som ledelse og revisjon kan bruke. 
                                Vi leverer dokumentasjon som tåler granskning og gir verdi til beslutningstakere.
                            </Body>
                        </div>
                        <div className="p-6 bg-white border-l-4 border-orange-500 shadow rounded">
                            <H3>Retro presisjon</H3>
                            <Body>
                                Terminal-tilnærming som minner oss om det viktigste — signal, ikke støy. 
                                Fra «hacker-vibe» til enterprise uten å miste presisjon.
                            </Body>
                        </div>
                    </div>
                </section>

                {/* Lokasjon og fokus */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-blue-100 rounded-lg">
                            <div className="text-4xl mb-2">📍</div>
                            <H3>Oslo</H3>
                            <Body>Norsk base, norsk kontekst</Body>
                        </div>
                        <div className="p-6 bg-green-100 rounded-lg">
                            <div className="text-4xl mb-2">🌍</div>
                            <H3>Nordic focus</H3>
                            <Body>Nordisk perspektiv på sikkerhet</Body>
                        </div>
                        <div className="p-6 bg-purple-100 rounded-lg">
                            <div className="text-4xl mb-2">🛡️</div>
                            <H3>Security Ops</H3>
                            <Body>Operativ sikkerhet i praksis</Body>
                        </div>
                    </div>
                </section>

                {/* Samarbeidsmodell */}
                <section className="mb-12">
                    <H2 className="mb-6">Samarbeidsmodell</H2>
                    <Body className="mb-6">
                        Vi jobber tett med kunde-teamet. Dere får et forutsigbart kontaktpunkt, 
                        faste leveranser og en plan for å øke modenheten over tid.
                    </Body>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                01
                            </div>
                            <div className="flex-1">
                                <H3>Felles mål</H3>
                                <Body>
                                    Hva skal beskyttes, hvilke trusler er viktigst, og hvilke krav må oppfylles. 
                                    Vi starter alltid med å forstå deres situasjon og behov.
                                </Body>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                02
                            </div>
                            <div className="flex-1">
                                <H3>Operativ leveranse</H3>
                                <Body>
                                    Deteksjon, respons, forbedring — med løpende status. 
                                    Dere får regelmessige rapporter og kan følge med på utviklingen.
                                </Body>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                03
                            </div>
                            <div className="flex-1">
                                <H3>Styring & evidens</H3>
                                <Body>
                                    Kontrollmapping og dokumentasjon som oppdateres i takt med drift. 
                                    Evidens samles inn automatisk og er alltid tilgjengelig.
                                </Body>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Våre prinsipper */}
                <section className="mb-12 p-8 bg-gray-50 rounded-lg">
                    <H2 className="mb-6">Våre prinsipper i praksis</H2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">✓</div>
                            <Body>Dataminimering — vi samler kun det som trengs</Body>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">✓</div>
                            <Body>Sporbarhet — full logging av hendelser og beslutninger</Body>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">✓</div>
                            <Body>Zero Trust — aldri stol, alltid verifiser</Body>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">✓</div>
                            <Body>Least privilege — minimal tilgang, maksimal sikkerhet</Body>
                        </div>
                    </div>
                </section>

                {/* Terminal-stil seksjon */}
                <section className="mb-12 bg-black text-green-400 p-6 rounded font-mono text-sm overflow-x-auto">
                    <div className="mb-2">sysnordic@oslo:~$ init --soc-as-a-service</div>
                    <div className="ml-4 mb-1">[ ok ] 24/7 overvåking • deteksjon • respons</div>
                    <div className="ml-4 mb-1">[ ok ] Incident Response & beredskap</div>
                    <div className="ml-4 mb-1">[ ok ] Digital etterforskning / forensics</div>
                    <div className="ml-4 mb-1">[ ok ] Compliance: NSM • NIS2 • ISO/IEC 27001</div>
                    <div className="mt-4 text-white">Status: KLAR — vi bygger motstandsdyktige virksomheter.</div>
                </section>

                {/* CTA */}
                <section className="text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                    <H2 className="text-white mb-4">Vil du prate med oss?</H2>
                    <Body className="text-white mb-6">
                        Vi starter gjerne med en kort avklaring (30 min) og skisserer anbefalt leveranse, 
                        datakilder og forventet effekt.
                    </Body>
                    <a 
                        href="mailto:kontakt@sysnordic.no" 
                        className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition text-lg"
                    >
                        kontakt@sysnordic.no
                    </a>
                </section>
            </div>
        </Layout>
    );
}
