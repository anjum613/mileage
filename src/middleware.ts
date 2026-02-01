import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
});

export default NextAuth(authConfig).auth((req) => {
    return intlMiddleware(req);
});

export const config = {
    // Matcher from auth.config + intl requirements
    matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
};
