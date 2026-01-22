export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: "Workshop" | "Concert" | "Community" | "Networking";
    image: string;
    price: number;
    ticketsAvailable: boolean;
}

export const events: Event[] = [
    {
        id: "first-fridays-jan",
        title: "Newtown First Fridays",
        description: "Join us for our monthly celebration of music, art, and community. Live performances from local artists, DJ sets, food vendors, and an art exhibition featuring emerging Johannesburg talent.",
        date: "2026-01-24",
        time: "19:00 - 23:00",
        location: "Newtown Radio Studio, 123 Pulse Avenue",
        category: "Community",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
        price: 0,
        ticketsAvailable: true
    },
    {
        id: "podcast-masterclass-feb",
        title: "Podcast Production Masterclass",
        description: "Learn the fundamentals of podcast production from our expert team. Covering recording techniques, editing, storytelling, and distribution. Limited to 20 participants.",
        date: "2026-02-02",
        time: "10:00 - 14:00",
        location: "Newtown Radio Studio",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2670&auto=format&fit=crop",
        price: 250,
        ticketsAvailable: true
    },
    {
        id: "jazz-night-feb",
        title: "Sunday Soul Live: Jazz Night",
        description: "An intimate evening of live jazz featuring the Sipho Khumalo Quartet. Experience the magic of Sunday Soul Sessions in person with special guests.",
        date: "2026-02-09",
        time: "18:00 - 21:00",
        location: "The Jazz Cafe, Newtown",
        category: "Concert",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2670&auto=format&fit=crop",
        price: 150,
        ticketsAvailable: true
    },
    {
        id: "dj-workshop-feb",
        title: "DJ Skills Workshop with DJ Thabo",
        description: "Master the art of DJing with one of SA's finest. Learn beatmatching, mixing techniques, and how to read a crowd. Bring your laptop and headphones.",
        date: "2026-02-15",
        time: "14:00 - 18:00",
        location: "Newtown Radio Studio",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2670&auto=format&fit=crop",
        price: 300,
        ticketsAvailable: true
    },
    {
        id: "poetry-slam-feb",
        title: "Poetry Slam: Open Mic Night",
        description: "Share your voice at our monthly poetry slam. Hosted by Naledi Mokoena. Sign up for a slot or come to support local poets. Prizes for top 3 performers.",
        date: "2026-02-20",
        time: "19:00 - 22:00",
        location: "Newtown Radio Studio",
        category: "Community",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2670&auto=format&fit=crop",
        price: 50,
        ticketsAvailable: true
    },
    {
        id: "industry-mixer-mar",
        title: "Music Industry Mixer",
        description: "Network with artists, producers, managers, and industry professionals. Panel discussions, Q&A, and opportunities to connect with key players in SA music.",
        date: "2026-03-05",
        time: "17:00 - 21:00",
        location: "Newtown Cultural Precinct",
        category: "Networking",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop",
        price: 100,
        ticketsAvailable: true
    }
];

export function getUpcomingEvents(): Event[] {
    const now = new Date();
    return events
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEventById(id: string): Event | undefined {
    return events.find(event => event.id === id);
}
