'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, User } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('Navigation');
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
              src="/logo-final.jpg"
              alt="Mileage Logo"
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            Mileage <span className="font-light opacity-90 text-sm md:text-lg">{t('brand_subtitle')}</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link href="/#home" className="text-sm font-medium hover:text-secondary transition-colors">{t('home')}</Link>
          <Link href="/#fleet" className="text-sm font-medium hover:text-secondary transition-colors">{t('fleet')}</Link>
          <Link href="/#why-us" className="text-sm font-medium hover:text-secondary transition-colors">{t('about')}</Link>
          <Link href="/terms" className="text-sm font-medium hover:text-secondary transition-colors">{t('terms')}</Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-secondary transition-colors">{t('contact')}</Link>

          <Button asChild variant="secondary" className="font-bold cursor-pointer">
            <a href={`tel:+${phoneNumber}`} className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {t('call')}
            </a>
          </Button>

          <NextLink href="/admin" className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors" title={t('admin')}>
            <User className="w-5 h-5" />
          </NextLink>

          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="p-2 text-primary-foreground hover:bg-primary/90 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary/20 p-4 space-y-4 shadow-xl">
          <Link href="/" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={handleLogoClick}>{t('home')}</Link>
          <Link href="/#fleet" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>{t('fleet')}</Link>
          <Link href="/#why-us" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>{t('about')}</Link>
          <Link href="/terms" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>{t('terms')}</Link>
          <Link href="/#contact" className="block py-2 text-primary-foreground/90 hover:text-white font-medium" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
        </div>
      )}
    </header>
  );
}