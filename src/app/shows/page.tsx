import { prisma } from '@/lib/prisma';
import ShowsClient from './client';

export const revalidate = 0;

export default async function ShowsPage() {
    const shows = await prisma.show.findMany({
        orderBy: { title: 'asc' },
        include: { host: true }
    });

    return <ShowsClient initialShows={shows} />;
}
