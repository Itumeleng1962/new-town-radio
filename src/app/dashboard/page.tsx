import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import DashboardClient from './client';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/login');
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
        }
    });

    if (!user) {
        redirect('/login'); // Should not happen if session exists
    }

    // Mock notification count for now, or fetch if Notification model exists
    const notificationCount = 3;

    return (
        <DashboardClient
            user={{
                ...user,
                createdAt: user.createdAt.toISOString()
            }}
            notificationCount={notificationCount}
        />
    );
}
