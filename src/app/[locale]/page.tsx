import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FleetSection from '@/components/FleetSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { cars as staticCars } from '@/data/cars';
import type { Car } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function Home() {
    let cars: Car[] = [];

    try {
        // Attempt to fetch from DB
        cars = await prisma.car.findMany({
            where: { isAvailable: true },
            orderBy: { createdAt: 'desc' }
        });
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
            <Header />
            <Hero />
            <FleetSection cars={cars} />
            <WhyUsSection />
            <Footer />
        </main>
    );
}
