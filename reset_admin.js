const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdmin() {
    const email = 'anjumasiya613@gmail.com';
    const password = 'anjum613';

    try {
        console.log(`🔒 Hashing password for ${email}...`);
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(`👤 Updating/Creating admin user...`);
        const user = await prisma.admin.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword
            }
        });

        console.log(`✅ Success! Admin updated:`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Password: ${password}`);
        console.log(`\nYou can now log in on production.`);
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

resetAdmin();
