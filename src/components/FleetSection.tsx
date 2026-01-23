'use client';

import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';

export default function FleetSection() {
  return (
    <section id="fleet" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Fleet</h2>
          {/* UPDATED DESCRIPTION HERE */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reliable, economical, and ready for the road. Choose the perfect car for your daily needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
      </div>
    </section>
  );
}