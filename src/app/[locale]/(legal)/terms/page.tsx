'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
    const t = useTranslations('Legal.Terms');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto prose">
                    <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-gray-600 mb-4">{t('updated')}: {new Date().toLocaleDateString()}</p>

                    {/* Section 1: Driver Requirements */}
                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('sections.one.title')}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><strong>{t('sections.one.list.age').split(':')[0]}:</strong> {t('sections.one.list.age').split(':')[1]}</li>
                        <li><strong>{t('sections.one.list.license').split(':')[0]}:</strong> {t('sections.one.list.license').split(':')[1]}</li>
                        <li><strong>{t('sections.one.list.international').split(':')[0]}:</strong> {t('sections.one.list.international').split(':')[1]}</li>
                        <li><strong>{t('sections.one.list.documents').split(':')[0]}:</strong> {t('sections.one.list.documents').split(':')[1]}</li>
                    </ul>

                    {/* Section 2: Usage Restrictions */}
                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('sections.two.title')}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><strong>{t('sections.two.list.geo').split(':')[0]}:</strong> {t('sections.two.list.geo').split(':')[1]}</li>
                        <li><strong>{t('sections.two.list.offroad').split(':')[0]}:</strong> {t('sections.two.list.offroad').split(':')[1]}</li>
                        <li><strong>{t('sections.two.list.prohibited').split(':')[0]}:</strong> {t('sections.two.list.prohibited').split(':')[1]}</li>
                    </ul>

                    {/* Section 3: Insurance & Accidents */}
                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('sections.three.title')}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><strong>{t('sections.three.list.police').split(':')[0]}:</strong> {t('sections.three.list.police').split(':')[1]}</li>
                        <li><strong>{t('sections.three.list.excess').split(':')[0]}:</strong> {t('sections.three.list.excess').split(':')[1]}</li>
                        <li><strong>{t('sections.three.list.sports').split(':')[0]}:</strong> {t('sections.three.list.sports').split(':')[1]}</li>
                    </ul>

                    {/* Section 4: Payments & Deposits */}
                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('sections.four.title')}</h2>
                    <p className="text-gray-700">
                        {t('sections.four.content')}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
