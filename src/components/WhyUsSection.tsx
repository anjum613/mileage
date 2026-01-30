'use client';

import { useTranslations } from 'next-intl';
import { Wallet, Settings, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function WhyUsSection() {
  const t = useTranslations('WhyUs');

  const benefits = [
    {
      icon: <Wallet className="w-8 h-8 text-secondary" />,
      title: t('budget_title'),
      description: t('budget_desc')
    },
    {
      icon: <Settings className="w-8 h-8 text-secondary" />,
      title: t('maintained_title'),
      description: t('maintained_desc')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: t('hidden_title'),
      description: t('hidden_desc')
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-secondary" />,
      title: t('easy_title'),
      description: t('easy_desc')
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-primary mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}