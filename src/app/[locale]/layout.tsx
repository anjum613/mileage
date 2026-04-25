import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import AuthProvider from '@/components/AuthProvider';

// Using Geist is perfect for a sleek, modern UI
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.mileagecarental.com"),
    title: {
        default: "Mileage | Affordable Car Rental in Al Ain",
        template: "%s | Mileage Rent A Car"
    },
    description: "Rent economical cars in Al Ain, UAE. Affordable daily and monthly rates. Seamless English & Arabic booking.",
    icons: {
        icon: "/logo-final.jpg",
        apple: "/logo-final.jpg",
    }
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Basic validation (middleware should handle this, but good for safety)
    if (!['en', 'ar'].includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
            >
                <AuthProvider>
                    <NextIntlClientProvider messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
