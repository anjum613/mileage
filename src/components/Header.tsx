'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "971566181688"; 

  // Function to smooth scroll to top
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-primary text-primary-foreground shadow-lg border-b border-primary/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0">
             <Image 
               src="/logo-final.png" 
               alt="Mileage Logo" 
               fill 
               className="object-contain drop-shadow-md"
               priority
             />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            Mileage <span className="font-light opacity-90 text-sm md:text-lg">Rent A Car</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {/* Fixed Home Link */}
          <a href="#" onClick={scrollToTop} className="text-sm font-medium hover:text-secondary transition-colors">Home</a>
          <a href="#fleet" className="text-sm font-medium hover:text-secondary transition-colors">Fleet</a>
          <a href="#why-us" className="text-sm font-medium hover:text-secondary transition-colors">About Us</a>
          <a href="#contact" className="text-sm font-medium hover:text-secondary transition-colors">Contact</a>
          
          {/* Fixed Call Button */}
          <Button asChild variant="secondary" className="font-bold cursor-pointer">
            <a href={`tel:+${phoneNumber}`} className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </Button>
        </div>

        <button 
          className="md:hidden p-2 text-primary-foreground hover:bg-primary/90 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary/20 p-4 space-y-4 shadow-xl">
          <a href="#" onClick={scrollToTop} className="block py-2 text-primary-foreground/90 hover:text-white font-medium">Home</a>
          <a href="#fleet" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Fleet</a>
          <a href="#why-us" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="#contact" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}