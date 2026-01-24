'use client';

import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link'; // IMPORT LINK

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="space-y-4">
            <h4 className="text-3xl font-bold tracking-tight text-white">
              Mileage <span className="font-light opacity-80">Rent A Car</span>
            </h4>
            <p className="text-primary-foreground/80 leading-relaxed text-sm">
              Your go-to choice for affordable and reliable car rentals in Al Ain.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0 text-secondary" />
                <div className="flex flex-col">
                  <span>Call or WhatsApp:</span>
                  <a href="tel:+971566181688" className="font-bold hover:text-white transition-colors">
                    +971 56 618 1688
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0 text-secondary" />
                <span>mileagealain@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-secondary" />
                <span>Al Ain,<br />Abu Dhabi, UAE</span>
              </li>
              
              {/* FIXED: Use Link for internal page */}
              <li className="pt-4 mt-4 border-t border-white/10">
                <Link href="/terms" className="hover:text-white transition-colors underline decoration-secondary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden h-48 bg-white/10 border border-white/20 relative group">
             <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-primary/50 font-medium">
                <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" /> View on Map
                </span>
             </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mileage Rent A Car. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}