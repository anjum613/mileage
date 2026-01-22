'use client';

import { cars } from '@/data/cars';
import CarCard from './CarCard';

export default function FleetSection() {
  return (
    <section id="fleet" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Fleet Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our premium selection of vehicles. From economy to luxury, we have the perfect ride for your journey in Al Ain.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
      </div>
    </section>
  );
}