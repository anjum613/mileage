'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Car } from '@/data/cars';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fuel, Gauge, Users, X } from 'lucide-react'; 

export default function CarCard({ car }: { car: Car }) {
  const [showTerms, setShowTerms] = useState(false); // State to control the popup

  const phoneNumber = "971566181688";
  const whatsappMessage = `Hi, I'm interested in renting the ${car.name} (${car.model}). Price: ${car.price} AED/day`;
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-blue-50/50 flex flex-col h-full">
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={car.img}
            alt={car.name}
            fill
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
          {/* Button opens the Terms Popup instead of going directly to WhatsApp */}
          <Button 
            onClick={() => setShowTerms(true)}
            className="w-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg" 
            size="lg"
          >
            Book via WhatsApp
          </Button>
        </CardFooter>
      </Card>

      {/* TERMS AND CONDITIONS POPUP MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-primary px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Requirements</h3>
              <button onClick={() => setShowTerms(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
                <strong>Notice:</strong> We currently rent to <strong>UAE Residents only</strong>.
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Minimum Age</span>
                  <span className="font-medium text-gray-900 text-sm">21 Years Old</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Driving License</span>
                  <span className="font-medium text-gray-900 text-sm text-right">Valid UAE License<br/>(Held for 6+ months)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">ID Required</span>
                  <span className="font-medium text-gray-900 text-sm">Original Emirates ID</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500 text-sm">Payment</span>
                  <span className="font-medium text-gray-900 text-sm">Credit or Debit Card</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-2 flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowTerms(false)}
                className="w-full"
              >
                Cancel
              </Button>
              
              <Button 
                asChild 
                className="w-full font-bold text-white bg-[#228B22] hover:bg-[#1e7b1e]"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Proceed to WhatsApp
                </a>
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}