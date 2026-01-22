export interface Show {
    id: string;
    title: string;
    host: string;
    hostId: string;
    description: string;
    genre: string;
    image: string;
    schedule: {
        day: string;
        time: string;
    }[];
    featured: boolean;
}

export const shows: Show[] = [
    {
        id: "the-block-party",
        title: "The Block Party",
        host: "DJ Thabo",
        hostId: "dj-thabo",
        description: "The hottest hip-hop and R&B tracks from South Africa and beyond. Every Friday night, we bring the party to your speakers with exclusive mixes, artist interviews, and the freshest beats.",
        genre: "Hip Hop / R&B",
        image: "https://images.unsplash.com/photo-1478737270239-2f52b27e90f3?q=80&w=2676&auto=format&fit=crop",
        schedule: [
            { day: "Friday", time: "20:00 - 23:00" }
        ],
        featured: true
    },
    {
        id: "city-speak",
        title: "City Speak",
        host: "Lindiwe Mthembu",
        hostId: "lindiwe-mthembu",
        description: "Conversations that matter. Join Lindiwe as she sits down with activists, artists, entrepreneurs, and changemakers shaping Johannesburg's future.",
        genre: "Talk / Culture",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
        schedule: [
            { day: "Wednesday", time: "18:00 - 19:30" }
        ],
        featured: true
    },
    {
        id: "sunday-soul-sessions",
        title: "Sunday Soul Sessions",
        host: "Sipho Khumalo",
        hostId: "sipho-khumalo",
        description: "Start your Sunday with smooth jazz, neo-soul, and classic R&B. Sipho curates the perfect soundtrack for a relaxed morning with your coffee.",
        genre: "Jazz / Soul",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop",
        schedule: [
            { day: "Sunday", time: "10:00 - 13:00" }
        ],
        featured: true
    },
    {
        id: "morning-drive",
        title: "Morning Drive",
        host: "DJ Tshepo",
        hostId: "dj-tshepo",
        description: "Wake up with the city! Traffic updates, news, interviews, and the best music to start your day. Your daily companion for the commute.",
        genre: "Talk / Music Mix",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop",
        schedule: [
            { day: "Monday", time: "06:00 - 09:00" },
            { day: "Tuesday", time: "06:00 - 09:00" },
            { day: "Wednesday", time: "06:00 - 09:00" },
            { day: "Thursday", time: "06:00 - 09:00" },
            { day: "Friday", time: "06:00 - 09:00" }
        ],
        featured: false
    },
    {
        id: "afrobeats-takeover",
        title: "Afrobeats Takeover",
        host: "Zara Okafor",
        hostId: "zara-okafor",
        description: "The best of Afrobeats, Amapiano, and African pop music. From Lagos to Johannesburg, we celebrate the sounds taking over the world.",
        genre: "Afrobeats / Amapiano",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop",
        schedule: [
            { day: "Saturday", time: "15:00 - 18:00" }
        ],
        featured: false
    },
    {
        id: "underground-pulse",
        title: "Underground Pulse",
        host: "Marcus van der Berg",
        hostId: "marcus-vandenberg",
        description: "Techno, house, and electronic music from the underground. Deep cuts, live mixes, and the sounds you won't hear anywhere else.",
        genre: "Electronic / Techno",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2670&auto=format&fit=crop",
        schedule: [
            { day: "Saturday", time: "22:00 - 02:00" }
        ],
        featured: false
    },
    {
        id: "poetry-lounge",
        title: "Poetry Lounge",
        host: "Naledi Mokoena",
        hostId: "naledi-mokoena",
        description: "Spoken word, poetry, and storytelling. A space for voices, verses, and the power of language.",
        genre: "Spoken Word / Poetry",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        schedule: [
            { day: "Thursday", time: "20:00 - 21:00" }
        ],
        featured: false
    },
    {
        id: "midday-mix",
        title: "Midday Mix",
        host: "Lindiwe Mthembu",
        hostId: "lindiwe-mthembu",
        description: "Your lunchtime soundtrack. A mix of feel-good tunes, local favorites, and international hits to get you through the afternoon.",
        genre: "Music Mix",
        image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2670&auto=format&fit=crop",
        schedule: [
            { day: "Monday", time: "12:00 - 14:00" },
            { day: "Tuesday", time: "12:00 - 14:00" },
            { day: "Wednesday", time: "12:00 - 14:00" },
            { day: "Thursday", time: "12:00 - 14:00" },
            { day: "Friday", time: "12:00 - 14:00" }
        ],
        featured: false
    }
];

export function getShowById(id: string): Show | undefined {
    return shows.find(show => show.id === id);
}

export function getShowsByHost(hostId: string): Show[] {
    return shows.filter(show => show.hostId === hostId);
}

export function getFeaturedShows(): Show[] {
    return shows.filter(show => show.featured);
}
