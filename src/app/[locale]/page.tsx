import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FleetSection from '@/components/FleetSection';
import Footer from '@/components/Footer';
import ReviewsSection from '@/components/ReviewsSection';
import { prisma } from '@/lib/prisma';
import { cars as staticCars } from '@/data/cars';
import type { Car } from '@prisma/client';
import { BUSINESS } from '@/lib/business';
import { unstable_cache } from 'next/cache';
import { Suspense } from 'react';

export const revalidate = 60;

const getAvailableCars = unstable_cache(
    async () => prisma.car.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: 'desc' },
    }),
    ['available-cars'],
    { revalidate: 60 }
);

export default async function Home() {
    let cars: Car[] = [];

    try {
        cars = await getAvailableCars();
    } catch (e) {
        console.warn("Database connection failed, falling back to static data.");
        // Fallback to static data if DB fails
        // We cast staticCars to Car[] because the types are compatible enough for display
        cars = staticCars as unknown as Car[];
    }

    // If DB return empty array, fallback to static data so the site isn't empty on first load
    if (cars.length === 0) {
        cars = staticCars as unknown as Car[];
    }

    // Wait, if users visits site now and DB is broken, they see static data. 
    // If DB is connected but empty, they see nothing.
    // That's fine.

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AutoRental',
                        name: BUSINESS.name,
                        url: BUSINESS.website,
                        telephone: BUSINESS.bookingPhoneE164,
                        email: BUSINESS.email,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Al Ain',
                            addressCountry: 'AE',
                        },
                        areaServed: 'Al Ain, United Arab Emirates',
                        sameAs: [BUSINESS.reviewUrl, BUSINESS.facebookUrl],
                    }),
                }}
            />
            <Header />
            <Hero />
            <FleetSection cars={cars} />
            <Suspense fallback={<ReviewsFallback />}>
                <ReviewsSection />
            </Suspense>
            <Footer />
        </main>
    );
}

function ReviewsFallback() {
    return <section id="reviews" className="min-h-80 bg-slate-50 py-24" aria-hidden="true" />;
}
