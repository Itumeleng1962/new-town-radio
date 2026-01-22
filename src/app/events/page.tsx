import { prisma } from '@/lib/prisma';
import EventsContent from './EventsContent';

export const revalidate = 0; // Ensure fresh data on every request

export default async function EventsPage() {
    const events = await prisma.event.findMany({
        orderBy: { date: 'asc' },
        where: {
            date: {
                gte: new Date() // Only show future events
            }
        }
    });

    return <EventsContent events={events} />;
}
