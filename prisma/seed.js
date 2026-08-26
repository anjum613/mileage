const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Enable Row Level Security (RLS) on tables to secure Supabase REST API exposure
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."Admin" ENABLE ROW LEVEL SECURITY;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."Car" ENABLE ROW LEVEL SECURITY;`);

    // Use environment variables for seeding to protect privacy in public repo
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'securePassword123';

    const admins = [
        { email, password }
    ];

    for (const user of admins) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const admin = await prisma.admin.upsert({
            where: { email: user.email },
            update: {
                password: hashedPassword,
            },
            create: {
                email: user.email,
                password: hashedPassword,
            },
        });
        console.log(`Admin processed: ${admin.email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
