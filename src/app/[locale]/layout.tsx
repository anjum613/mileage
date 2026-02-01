import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Inter is a modern, clean sans-serif font perfect for web applications
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: 'swap',
});

export const metadata: Metadata = {
    // Updated for your Brand
    title: "Mileage Rent A Car | Car Rental in Al Ain",
    description: "Experience the best car rental service in Al Ain, UAE. Affordable fleet, best rates, and instant booking.",
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
                className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
            >
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
