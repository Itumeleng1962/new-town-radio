
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    const role = process.argv[3] || 'ADMIN';

    if (!email) {
        console.error('Please provide an email address.');
        console.log('Usage: npx tsx scripts/set-admin.ts <email> [role]');
        process.exit(1);
    }

    console.log(`Looking for user with email: ${email}...`);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error(`User with email ${email} not found.`);
        process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.id})`);
    console.log(`Current role: ${user.role}`);

    if (user.role === role) {
        console.log(`User is already a ${role}.`);
        process.exit(0);
    }

    console.log(`Promoting user to ${role}...`);

    await prisma.user.update({
        where: { email },
        data: { role },
    });

    console.log(`Success! User ${email} is now a ${role}.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
