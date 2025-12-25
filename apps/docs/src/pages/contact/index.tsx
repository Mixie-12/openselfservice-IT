import React from 'react';

import HubspotForm from '@site/src/components/HubspotForm';

import Layout from '@theme/Layout';

import styles from './contact.module.scss';

const Contact = () => {
    const portalId = '143969481';
    const formId = '0a05bbf7-cb3c-4a69-bbec-9b6801df31a8';

    return (
        <Layout
            title="Kontakt oss - Sysnordic"
            description="Ta kontakt med Sysnordic for SOC as a Service, Incident Response, og compliance-tjenester"
        >
            <div className="linearGradient static">
                <div className={styles.contactContainer}>
                    <div className="gradientWrapper">
                        <div className="gradientCircleGreen static" />
                        <div className="gradientCircleBlue static" />
                        <div className="mainContentWrapper">
                            <div className="container flex flex-col">
                                <div className="grid md:grid-cols-2 gap-14 md:gap-28 mt-14">
                                    <div>
                                        <h1 className={styles['font-extrabold']}>
                                            Ta <span className={styles['text-highlighted']}>kontakt</span>
                                        </h1>
                                        <p>
                                            Trenger du hjelp med SOC, Incident Response, eller compliance?
                                            <br /> Vil du diskutere hvordan vi kan støtte deres 
                                            sikkerhetsbehov og møte krav fra NSM, NIS2, eller ISO 27001?
                                        </p>
                                        <p>Send oss en henvendelse via skjemaet, eller kontakt oss direkte:</p>
                                        <p>
                                            E-post:{' '}
                                            <a href="mailto:kontakt@sysnordic.no">kontakt@sysnordic.no</a>
                                        </p>
                                    </div>
                                    <HubspotForm
                                        portalId={portalId}
                                        formId={formId}
                                        title="Kontakt oss"
                                        description={
                                            <>Fyll ut skjemaet under, så tar vi kontakt så snart som mulig.</>
                                        }
                                        pageName="Kontakt - Sysnordic"
                                        fields={[
                                            {
                                                __typename: 'text',
                                                label: 'E-post',
                                                type: 'email',
                                                required: true,
                                                name: 'email',
                                            },
                                            {
                                                __typename: 'text',
                                                label: 'Fornavn',
                                                type: 'text',
                                                name: 'firstname',
                                            },
                                            { __typename: 'text', label: 'Etternavn', type: 'text', name: 'lastname' },
                                            {
                                                __typename: 'textarea',
                                                label: 'Melding',
                                                required: true,
                                                name: 'message',
                                                rows: 2,
                                            },
                                        ]}
                                        consents={[
                                            {
                                                name: 'email_contact_consent',
                                                required: true,
                                                label: (
                                                    <>
                                                        Jeg samtykker til at Sysnordic behandler mine personopplysninger 
                                                        for å svare på henvendelser og gi informasjon om produkter og tjenester.
                                                    </>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="mt-14 md:mt-24 w-full flex justify-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
