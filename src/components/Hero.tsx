'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
  const whatsappNumber = "971566181688"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi,%20I%20would%20like%20to%20rent%20a%20car`;

  return (
    // FIX IS HERE: 
    // 1. Changed h-[85vh] to h-[55vh] for mobile (md:h-[85vh] for desktop)
    // 2. Changed min-h-[600px] to min-h-[400px] for mobile (md:min-h-[600px] for desktop)
    <div id="home" className="relative w-full h-[55vh] md:h-[85vh] min-h-[400px] md:min-h-[600px] flex flex-col justify-end">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-camryy.jpg"
          alt="Economical car rental in Al Ain"
          fill
          // Keep object-center so the car stays in the middle
          className="object-cover object-center brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 pb-8 md:pb-12">
        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
          AFFORDABLE RENTALS <br /> IN AL AIN
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-lg font-medium drop-shadow-md">
          Reliable cars at unbeatable prices. No hidden fees, just great value.
        </p>
      </div>

      {/* Contact Action Bar */}
      <div className="relative z-20 w-full bg-primary border-t border-primary/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left hidden md:block">
            <h3 className="text-white font-bold text-2xl">Book Your Ride Today</h3>
            <p className="text-primary-foreground/80">Simple booking via WhatsApp or Phone call.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* WhatsApp Button */}
            <Button 
              asChild 
              size="lg" 
              className="bg-[#2E8B57] hover:bg-[#1e7b1e] text-white font-bold text-lg h-12 shadow-lg border-none w-full md:w-auto"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us
              </a>
            </Button>

            {/* Phone Button */}
            <Button 
              asChild 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg h-12 shadow-lg w-full md:w-auto"
            >
              <a href={`tel:+${whatsappNumber}`}>
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}