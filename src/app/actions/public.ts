"use server";

import { prisma } from "@/lib/prisma";

export async function getFeaturedShowsAction() {
    try {
        const shows = await prisma.show.findMany({
            where: { featured: true },
            include: { host: true },
            orderBy: { title: 'asc' }
        });

        // Map to match the expected frontend structure if needed, or just return as is
        // The frontend expects: { id, title, host, description, genre, image, schedule, featured }
        // Our DB has: { id, title, description, coverImage, schedule, host: { name }, featured }

        return shows.map(show => ({
            id: show.id,
            title: show.title,
            host: show.host.name || "Unknown Host",
            hostId: show.hostId,
            description: show.description,
            genre: "Mix", // Helper: Add genre to DB later if needed
            image: show.coverImage || "https://images.unsplash.com/photo-1478737270239-2f52b27e90f3?q=80&w=2676&auto=format&fit=crop",
            schedule: show.schedule, // Note: Frontend might expect object array, DB has string. We'll handle this in UI.
            featured: show.featured
        }));
    } catch (error) {
        console.error("Error fetching featured shows:", error);
        return [];
    }
}

export async function getUpcomingEventsAction() {
    try {
        const now = new Date();
        const events = await prisma.event.findMany({
            where: {
                date: {
                    gte: now
                }
            },
            orderBy: {
                date: 'asc'
            },
            take: 3
        });

        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date.toISOString(),
            time: "18:00", // Helper: Add time to DB if needed, or extract from date
            location: event.location,
            category: "Event", // Helper: Add category to DB if needed
            image: event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
            price: 0, // Helper: Add price to DB if needed
            ticketsAvailable: !!event.ticketLink
        }));
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        return [];
    }
}
