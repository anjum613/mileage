'use client';

import Image from 'next/image';
import { Car } from '@/data/cars';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fuel, Gauge, Users } from 'lucide-react'; 

export default function CarCard({ car }: { car: Car }) {
  const whatsappMessage = `Hi, I'm interested in renting the ${car.name} (${car.model}). Price: ${car.price} AED/day`;
  const whatsappLink = `https://wa.me/971566181688?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-blue-50/50 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={car.img}
          alt={car.name}
          fill
          // CHANGES HERE:
          // 1. Removed 'p-4' (removes the white border padding)
          // 2. Changed 'object-contain' to 'object-cover' (zooms to fill the box)
          // 3. Added 'object-center' to keep the car focused
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <Badge variant="secondary" className="absolute top-4 right-4 font-bold shadow-sm bg-white/90 text-black">
          {car.year}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{car.model}</p>
            <CardTitle className="text-xl font-bold text-primary mt-1">{car.name}</CardTitle>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-primary">{car.price}</span>
            <span className="text-xs text-muted-foreground font-medium">AED / Day</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Quick Specs */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-white/60 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-secondary" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-secondary" />
            <span>{car.fuelType}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          asChild 
          className="w-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg" 
          size="lg"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Book via WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}