'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Mileage <span className="font-light text-sm">Rent A Car</span></h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              {t('rights')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#fleet" className="hover:text-white transition-colors">Fleet</Link></li>
              <li><Link href="/#why-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Al Ain, UAE</li>
              <li>+971 50 123 4567</li>
              <li>info@mileagerentas.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-primary/20 mt-12 pt-8 text-center text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Mileage Rent A Car. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}