'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    const t = useTranslations('Legal.Privacy');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto prose">
                    <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-gray-600 mb-4">{t('effective')}: {new Date().toLocaleDateString()}</p>

                    <p className="text-gray-700 mb-4">
                        {t('intro')}
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('one.title')}</h2>
                    <p className="text-gray-700">
                        {t('one.content')}
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                        <li>{t('one.list.one')}</li>
                        <li>{t('one.list.two')}</li>
                        <li>{t('one.list.three')}</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('two.title')}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>{t('two.list.one')}</li>
                        <li>{t('two.list.two')}</li>
                        <li>{t('two.list.three')}</li>
                        <li>{t('two.list.four')}</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('three.title')}</h2>
                    <p className="text-gray-700">
                        {t('three.content')}
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('four.title')}</h2>
                    <p className="text-gray-700">
                        {t('four.content')}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
