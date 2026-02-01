import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            // Extract locale if present (e.g. /en/admin...)
            const localeMatch = pathname.match(/^\/(en|ar)/);
            const locale = localeMatch ? localeMatch[1] : 'en'; // Default to 'en' if missing

            // Normalize path for checking (remove locale)
            const filePath = pathname.replace(/^\/(en|ar)/, '');

            const isOnDashboard = filePath.startsWith('/admin/dashboard') || filePath.startsWith('/admin/cars');
            const isLoginPage = filePath === '/admin';

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL(`/${locale}/admin`, nextUrl)); // Redirect to localized login
            } else if (isLoginPage) {
                if (isLoggedIn) return Response.redirect(new URL(`/${locale}/admin/dashboard`, nextUrl));
                return true;
            }

            // Allow all other routes (public)
            return true;
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
