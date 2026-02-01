import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

import { authConfig } from "@/auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsedCredentials = loginSchema.safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.admin.findUnique({
                        where: { email },
                    });

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return {
                        ...user,
                        id: user.id.toString(),
                    };
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
    // Extend callbacks if needed (session and jwt are not in authConfig)
    callbacks: {
        ...authConfig.callbacks,
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            return token;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days - this controls cookie expiration
        updateAge: 7 * 24 * 60 * 60, // Refresh session every 7 days
    },
    secret: process.env.NEXTAUTH_SECRET,
});
