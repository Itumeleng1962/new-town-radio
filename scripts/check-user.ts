
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking recent users...');
    const users = await prisma.user.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: { email: true, role: true, name: true }
    });

    console.table(users);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
