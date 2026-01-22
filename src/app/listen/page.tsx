import { prisma } from '@/lib/prisma';
import ListenContent from './ListenContent';

export const revalidate = 0;

export default async function ListenPage() {
    const episodes = await prisma.episode.findMany({
        take: 6,
        orderBy: { releaseDate: 'desc' },
        include: { show: true }
    });

    return <ListenContent episodes={episodes} />;
}
