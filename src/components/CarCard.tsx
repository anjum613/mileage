'use client';

import { useState, type SVGProps } from 'react';
import Image from 'next/image';
import { Car } from '@/data/cars';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fuel, Gauge, Users, X } from 'lucide-react'; 

export default function CarCard({ car }: { car: Car }) {
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false); 

  const phoneNumber = "971566181688";
  const whatsappMessage = `Hi, I'm interested in renting the ${car.name} (${car.model}). I accept the rental terms. Price: ${car.price} AED/day`;
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
          <Button 
            onClick={() => { setShowTerms(true); setAgreed(false); }}
            className="w-full font-bold bg-primary hover:bg-primary/90 text-white shadow-lg" 
            size="lg"
          >
            Book via WhatsApp
          </Button>
        </CardFooter>
      </Card>

      {/* TERMS POPUP MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            <div className="bg-primary px-6 py-4 flex justify-between items-center shrink-0">
              <h3 className="text-white font-bold text-lg">Key Rental Terms</h3>
              <button onClick={() => setShowTerms(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800 mb-4">
                <strong>Notice:</strong> We currently rent to <strong>UAE Residents only</strong> (Emirates ID Required).
              </div>

              <h4 className="font-bold text-gray-900 mb-2">Important Rules:</h4>
              <div className="text-sm text-gray-600 space-y-3 mb-6 border p-3 rounded-md bg-gray-50 h-48 overflow-y-scroll">
                <p>1. <strong>Deposit:</strong> AED 1,500 security deposit (Refundable after 15 days).</p>
                <p>2. <strong>Mileage:</strong> 400 km limit per day. (Extra: AED 1/km).</p>
                <p>3. <strong>Insurance Excess:</strong> AED 1,500 for standard cars if accident is your fault.</p>
                <p>4. <strong>Geographical Limits:</strong> UAE Use Only. No border crossing.</p>
                <p>5. <strong>Driver:</strong> Only the contract holder is allowed to drive.</p>
                <p>6. <strong>Tolls & Fines:</strong> Customer pays all Salik (AED 4) and Traffic Fines.</p>
                <p>7. <strong>Fuel:</strong> Return with same fuel level.</p>
              </div>

              <div 
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" 
                onClick={() => setAgreed(!agreed)}
              >
                <div className={`mt-0.5 w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${agreed ? 'bg-primary border-primary' : 'border-gray-400 bg-white'}`}>
                  {agreed && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <label className="text-sm text-gray-700 leading-tight cursor-pointer select-none">
                  I confirm I am a UAE Resident, 25+ years old, and I agree to the <a href="/terms" target="_blank" className="text-blue-600 underline font-semibold" onClick={(e) => e.stopPropagation()}>Terms & Conditions</a>.
                </label>
              </div>
            </div>

            <div className="p-6 pt-2 flex flex-col gap-3 shrink-0">
              <Button 
                asChild 
                size="lg"
                disabled={!agreed} 
                className={`w-full font-bold text-white shadow-md transition-all ${agreed ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
              >
                {agreed ? (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Agree & Proceed to WhatsApp
                  </a>
                ) : (
                  <span className="pointer-events-none">Agree & Proceed to WhatsApp</span>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={() => setShowTerms(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}