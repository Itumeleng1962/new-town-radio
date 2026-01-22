import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ShowDetailContent from './ShowDetailContent';

export default async function ShowDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const showRecord = await prisma.show.findUnique({
        where: { id: slug },
        include: {
            host: true,
            episodes: {
                orderBy: { releaseDate: 'desc' }
            }
        }
    });

    if (!showRecord) {
        notFound();
    }

    const episodes = showRecord.episodes.map((ep) => ({
        id: ep.id,
        title: ep.title,
        date: ep.releaseDate?.toISOString().slice(0, 10) || '',
        duration: ep.duration ? `${ep.duration} min` : ''
    }));

    const show = {
        id: showRecord.id,
        title: showRecord.title,
        description: showRecord.description,
        host: showRecord.host?.name || 'Host',
        hostId: showRecord.hostId,
        genre: 'Show',
        image: showRecord.coverImage || '/placeholder.jpg',
        schedule: showRecord.schedule,
    };

    return <ShowDetailContent show={show} host={showRecord.host} episodes={episodes} />;
}
