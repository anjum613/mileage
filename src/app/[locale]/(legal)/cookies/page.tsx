'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesPage() {
    const t = useTranslations('Legal.Cookies');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto prose">
                    <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

                    <p className="text-gray-700 mb-4">
                        {t('intro')}
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('what.title')}</h2>
                    <p className="text-gray-700 mb-4">
                        {t('what.content')}
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('types.title')}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>{t('types.list.essential')}</li>
                        <li>{t('types.list.analytical')}</li>
                        <li>{t('types.list.functionality')}</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-3">{t('managing.title')}</h2>
                    <p className="text-gray-700">
                        {t('managing.content')}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
