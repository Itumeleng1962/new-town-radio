import { prisma } from '@/lib/prisma';
import ScheduleContent from './ScheduleContent';

export const revalidate = 0;

export default async function SchedulePage() {
    const shows = await prisma.show.findMany({
        orderBy: { schedule: 'asc' }, // Best effort sort, or by title
        include: { host: true }
    });

    return <ScheduleContent shows={shows} />;
}
