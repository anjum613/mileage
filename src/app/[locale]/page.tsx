'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FleetSection from '@/components/FleetSection';
import WhyUsSection from '@/components/WhyUsSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <Hero />
            <FleetSection />
            <WhyUsSection />
            <Footer />
        </main>
    );
}
