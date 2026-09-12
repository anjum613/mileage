import { ExternalLink, MessageSquareQuote } from 'lucide-react';
import { BUSINESS } from '@/lib/business';
import { getTranslations } from 'next-intl/server';

export default async function ReviewsSection() {
  const t = await getTranslations('Reviews');

  return (
    <section id="reviews" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <MessageSquareQuote className="h-10 w-10 text-secondary" aria-hidden="true" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-primary">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-700">{t('empty')}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={BUSINESS.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/90"
          >
            {t('cta')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
