'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // IMPORT THIS
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // GET CURRENT PAGE
  const phoneNumber = "971566181688"; 

  // Function to handle Logo click
  const handleLogoClick = () => {
    setIsOpen(false); // Close mobile menu if open
    
    // If we are already on the home page, force scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-primary text-primary-foreground shadow-lg border-b border-primary/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* ADDED onClick={handleLogoClick} HERE */}
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
        >
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
        </Link>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link href="/#home" className="text-sm font-medium hover:text-secondary transition-colors">Home</Link>
          <Link href="/#fleet" className="text-sm font-medium hover:text-secondary transition-colors">Fleet</Link>
          <Link href="/#why-us" className="text-sm font-medium hover:text-secondary transition-colors">About Us</Link>
          <Link href="/terms" className="text-sm font-medium hover:text-secondary transition-colors">T&C</Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-secondary transition-colors">Contact</Link>
          
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
          <Link href="/" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={handleLogoClick}>Home</Link>
          <Link href="/#fleet" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Fleet</Link>
          <Link href="/#why-us" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/terms" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Terms & Conditions</Link>
          <Link href="/#contact" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}