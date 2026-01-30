import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as any)) {
        locale = 'en'; // Default or handle error
        // In strict setup, we might want to return notFound() if not matched by middleware,
        // but middleware usually guarantees this.
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
