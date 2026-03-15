import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');

        // Vercel Cron sends a Bearer token matching CRON_SECRET from your env
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Perform a simple query to keep the database active
        const result = await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: 'success',
            message: 'Database keep-alive ping successful',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Keep-alive ping failed:', error);
        return NextResponse.json(
            { status: 'error', message: 'Database ping failed' },
            { status: 500 }
        );
    }
}
