const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Add all the admins you want here
    const admins = [
        { email: 'mileagealain@gmail.com', password: process.env.ADMIN_PASSWORD || 'admin123' },
        { email: 'anjumasiya613@gmail.com', password: process.env.ADMIN_PASSWORD || 'admin123' },
        { email: 'bijusalam75@gmail.com', password: process.env.ADMIN_PASSWORD || 'admin123' },       // { email: 'manager@mileagerentacar.ae', password: 'securePassword123' },
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
