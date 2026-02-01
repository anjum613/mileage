import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // Helper to strip locale from path for checking
            const pathname = nextUrl.pathname.replace(/^\/(en|ar)/, '');

            const isOnDashboard = pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/cars');
            const isLoginPage = pathname === '/admin';

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL('/admin', nextUrl)); // Explicit redirect to login
            } else if (isLoginPage) {
                if (isLoggedIn) return Response.redirect(new URL('/admin/dashboard', nextUrl));
                return true;
            }
            return true;
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
