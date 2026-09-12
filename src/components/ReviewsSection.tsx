import { ExternalLink, MessageSquareQuote, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/business';
import { getTranslations } from 'next-intl/server';
import ReviewsCarousel, { type ReviewCarouselItem } from '@/components/ReviewsCarousel';

type GoogleReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
  publishTime?: string;
};

type GooglePlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
  googleMapsUri?: string;
};

async function getGooglePlace(): Promise<GooglePlace | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return (await response.json()) as GooglePlace;
  } catch {
    return null;
  }
}

function stars(rating = 0) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${index < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
      aria-hidden="true"
    />
  ));
}

export default async function ReviewsSection() {
  const t = await getTranslations('Reviews');
  const place = await getGooglePlace();
  const reviews = place?.reviews
    ?.filter((review) => review.text?.text)
    .sort((first, second) => new Date(second.publishTime || 0).getTime() - new Date(first.publishTime || 0).getTime())
    .slice(0, 5) ?? [];
  const googleUrl = place?.googleMapsUri || BUSINESS.reviewUrl;

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
          {place?.rating ? (
            <div className="mt-5 flex items-center justify-center gap-2" aria-label={`${place.rating} out of 5 stars`}>
              <span className="font-bold text-primary">{place.rating.toFixed(1)}</span>
              <span className="flex">{stars(place.rating)}</span>
              {place.userRatingCount ? (
                <span className="text-sm text-muted-foreground">({place.userRatingCount} Google reviews)</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {reviews.length > 0 ? (
          <ReviewsCarousel reviews={reviews as ReviewCarouselItem[]} />
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-700">
              {t('empty')}
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={googleUrl}
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
