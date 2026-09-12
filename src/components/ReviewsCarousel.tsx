'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export type ReviewCarouselItem = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

function stars(rating = 0) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-5 w-5 ${index < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
      aria-hidden="true"
    />
  ));
}

export default function ReviewsCarousel({ reviews }: { reviews: ReviewCarouselItem[] }) {
  const t = useTranslations('Reviews');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const review = reviews[activeIndex];
  if (!review) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <article
        className="min-h-[240px] rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200 sm:p-10"
        aria-live="polite"
      >
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="flex">{stars(review.rating)}</span>
          {review.relativePublishTimeDescription ? (
            <span className="text-sm text-muted-foreground">{review.relativePublishTimeDescription}</span>
          ) : null}
        </div>
        <p className="text-base leading-8 text-slate-700">{review.text?.text}</p>
        {review.authorAttribution?.displayName ? (
          <p className="mt-6 text-sm font-bold text-primary">
            {review.authorAttribution.uri ? (
              <a href={review.authorAttribution.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {review.authorAttribution.displayName}
              </a>
            ) : (
              review.authorAttribution.displayName
            )}
          </p>
        ) : null}
      </article>

      {reviews.length > 1 ? (
        <div className="mt-5 flex justify-center gap-2" aria-label={t('carousel_label')}>
          {reviews.map((item, index) => (
            <button
              key={item.name || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${t('review')} ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${index === activeIndex ? 'bg-primary' : 'bg-slate-300 hover:bg-secondary'}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
