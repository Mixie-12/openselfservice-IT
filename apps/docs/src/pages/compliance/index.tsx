import type { ReactNode } from 'react';

import { Body, H2, H3 } from '@site/src/components/Typography';

import Layout from '@theme/Layout';

export default function Compliance(): ReactNode {

    return (
        <Layout title="Compliance - Sysnordic" description="Etterlevelse som fungerer i drift">
            <div className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Compliance</h1>
                    <Body className="text-xl">
                        Etterlevelse som fungerer i drift.
                    </Body>
                    <Body className="mt-4">
                        Mange virksomheter må dokumentere sikkerhetstiltak og rutiner. Vi hjelper dere å 
                        implementere kontroller som faktisk brukes — og produsere evidens som tåler revisjon.
                    </Body>
                </div>

                {/* Kjerneprinsipp */}
                <section className="mb-12 p-6 bg-blue-50 rounded-lg">
                    <H2 className="mb-4">Kjerneprinsipp</H2>
                    <Body className="text-lg font-semibold">
                        Kontroller + evidens + kontinuerlig forbedring
                    </Body>
                </section>

                {/* Rammeverk vi støtter */}
                <section className="mb-12">
                    <H2 className="mb-6">Rammeverk vi støtter</H2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border-l-4 border-blue-500 bg-white shadow rounded">
                            <H3>NSM</H3>
                            <Body>
                                Prinsipper, grunnsikring og veiledere tilpasset norsk kontekst. 
                                Vi hjelper deg implementere NSMs grunnprinsipper og sikre at 
                                virksomheten møter forventningene til norske myndigheter.
                            </Body>
                        </div>
                        <div className="p-6 border-l-4 border-purple-500 bg-white shadow rounded">
                            <H3>NIS2</H3>
                            <Body>
                                Støtte til styring, rapportering, risikohåndtering og leverandørkrav. 
                                Vi sikrer at dere oppfyller NIS2-direktivets krav til cybersikkerhet 
                                og hendelseshåndtering.
                            </Body>
                        </div>
                        <div className="p-6 border-l-4 border-green-500 bg-white shadow rounded">
                            <H3>ISO/IEC 27001</H3>
                            <Body>
                                ISMS, kontroller, risikovurdering, interne revisjoner og forbedringsløp. 
                                Full støtte for sertifisering og kontinuerlig vedlikehold av styringssystemet.
                            </Body>
                        </div>
                        <div className="p-6 border-l-4 border-orange-500 bg-white shadow rounded">
                            <H3>Andre behov</H3>
                            <Body>
                                Tilpasning mot bransjekrav og kundekrav (for eksempel sky, leverandører). 
                                Vi støtter også personvern (GDPR), PCI DSS og andre spesialiserte rammeverk.
                            </Body>
                        </div>
                    </div>
                </section>

                {/* Slik gjør vi det */}
                <section className="mb-12">
                    <H2 className="mb-6">Slik gjør vi det</H2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                01
                            </div>
                            <div>
                                <H3>Gap-analyse</H3>
                                <Body>
                                    Kartlegging mot målrammeverk og eksisterende praksis. 
                                    Vi identifiserer hull og prioriterer tiltak basert på risiko og modenhet.
                                </Body>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                02
                            </div>
                            <div>
                                <H3>Kontrollmapping</H3>
                                <Body>
                                    Kobling mellom tiltak, eiere, frekvens, og bevis (evidens). 
                                    Vi sikrer at hver kontroll har en ansvarlig og dokumenteres kontinuerlig.
                                </Body>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                03
                            </div>
                            <div>
                                <H3>Implementering</H3>
                                <Body>
                                    Policy/standarder, prosedyrer, tekniske tiltak og opplæring. 
                                    Vi jobber tett med dere for å sikre at kontrollene blir tatt i bruk.
                                </Body>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                04
                            </div>
                            <div>
                                <H3>Revisjonsklarhet</H3>
                                <Body>
                                    Rapporter, målinger og dokumentasjon som vedlikeholdes i drift. 
                                    Vi sikrer at evidens samles inn automatisk og er tilgjengelig ved revisjon.
                                </Body>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leveranser */}
                <section className="mb-12">
                    <H2 className="mb-6">Leveranser</H2>
                    <Body className="mb-6">
                        Velg nivå etter behov. Alt kan kobles mot SOC-leveransen for kontinuerlig evidens og oppfølging.
                    </Body>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition">
                            <div className="text-sm font-semibold text-blue-600 mb-2">STARTER</div>
                            <H3 className="mb-4">Compliance «Starter»</H3>
                            <Body>
                                Gap-analyse + prioritert tiltaksplan (4–6 uker). 
                                Perfekt for å få oversikt og starte reisen.
                            </Body>
                        </div>
                        <div className="p-6 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
                            <div className="text-sm font-semibold text-blue-600 mb-2">POPULÆR</div>
                            <H3 className="mb-4">Compliance «Program»</H3>
                            <Body>
                                ISMS/rammeverk implementering + evidensflyt. 
                                Full etablering av styringssystem med kontinuerlig drift.
                            </Body>
                        </div>
                        <div className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition">
                            <div className="text-sm font-semibold text-blue-600 mb-2">ENTERPRISE</div>
                            <H3 className="mb-4">Revisjonsstøtte</H3>
                            <Body>
                                Forberedelser, intern revisjon, lukking av avvik. 
                                Dedikert støtte før og under revisjon.
                            </Body>
                        </div>
                    </div>
                </section>

                {/* Målsetting */}
                <section className="text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                    <H2 className="text-white mb-4">Målet er alltid det samme:</H2>
                    <Body className="text-white text-xl font-semibold mb-2">
                        Mindre risiko. Mer kontroll. Tydelig dokumentasjon.
                    </Body>
                    <div className="mt-8">
                        <a 
                            href="mailto:kontakt@sysnordic.no" 
                            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition"
                        >
                            Kontakt oss for en uforpliktende prat
                        </a>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
