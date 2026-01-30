'use client';

import { useTranslations } from 'next-intl';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';

export default function FleetSection() {
  const t = useTranslations('Fleet');

  return (
    <section id="fleet" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid Layout Explanation:
           grid-cols-1 = Mobile (1 car per row)
           md:grid-cols-2 = Tablet (2 cars per row)
           lg:grid-cols-3 = Laptop/Desktop (3 cars per row)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </div>
    </section>
  );
}