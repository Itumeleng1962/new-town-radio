export interface Host {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    social: {
        twitter?: string;
        instagram?: string;
        facebook?: string;
    };
    specialties: string[];
}

export const hosts: Host[] = [
    {
        id: "dj-tshepo",
        name: "DJ Tshepo",
        role: "Morning Drive Host",
        bio: "Tshepo has been waking up Johannesburg for over 5 years. With a background in journalism and a passion for music, he brings energy, insight, and the perfect playlist to start your day.",
        image: "/placeholder.jpg",
        social: {
            twitter: "@djtshepo",
            instagram: "@djtshepo_official"
        },
        specialties: ["Talk Radio", "News", "Music Curation"]
    },
    {
        id: "lindiwe-mthembu",
        name: "Lindiwe Mthembu",
        role: "Host & Cultural Curator",
        bio: "Award-winning journalist and cultural commentator. Lindiwe brings critical conversations to the airwaves, exploring the intersection of art, politics, and society.",
        image: "/placeholder.jpg",
        social: {
            twitter: "@lindiwemthembu",
            instagram: "@lindiwe.speaks"
        },
        specialties: ["Interviews", "Cultural Commentary", "Music"]
    },
    {
        id: "sipho-khumalo",
        name: "Sipho Khumalo",
        role: "Jazz & Soul Specialist",
        bio: "A lifelong jazz enthusiast and vinyl collector. Sipho's deep knowledge of music history and impeccable taste make Sunday Soul Sessions a weekly ritual for listeners.",
        image: "/placeholder.jpg",
        social: {
            instagram: "@sipho_sounds"
        },
        specialties: ["Jazz", "Soul", "Vinyl Culture"]
    },
    {
        id: "dj-thabo",
        name: "DJ Thabo",
        role: "Hip Hop & R&B Host",
        bio: "From the streets of Soweto to the airwaves, Thabo is a pioneer in SA hip-hop. Producer, DJ, and cultural icon bringing the freshest beats every Friday.",
        image: "/placeholder.jpg",
        social: {
            twitter: "@dj_thabo",
            instagram: "@djthabo_sa",
            facebook: "DJThaboOfficial"
        },
        specialties: ["Hip Hop", "R&B", "Production"]
    },
    {
        id: "zara-okafor",
        name: "Zara Okafor",
        role: "Afrobeats Specialist",
        bio: "Born in Lagos, raised in Joburg. Zara bridges continents with her infectious energy and deep love for African music. She's on a mission to showcase the best of the continent.",
        image: "/placeholder.jpg",
        social: {
            twitter: "@zara_okafor",
            instagram: "@zara.afrobeats"
        },
        specialties: ["Afrobeats", "Amapiano", "African Pop"]
    },
    {
        id: "marcus-vandenberg",
        name: "Marcus van der Berg",
        role: "Electronic Music Curator",
        bio: "Techno purist and underground advocate. Marcus has been a fixture in Johannesburg's electronic music scene for over a decade, championing local and international talent.",
        image: "/placeholder.jpg",
        social: {
            instagram: "@marcus.vdb"
        },
        specialties: ["Techno", "House", "Electronic"]
    },
    {
        id: "naledi-mokoena",
        name: "Naledi Mokoena",
        role: "Poet & Storyteller",
        bio: "Published poet and spoken word artist. Naledi creates a space for voices often unheard, celebrating the power of language and storytelling.",
        image: "/placeholder.jpg",
        social: {
            twitter: "@naledi_poetry",
            instagram: "@naledi.words"
        },
        specialties: ["Poetry", "Spoken Word", "Literature"]
    }
];

export function getHostById(id: string): Host | undefined {
    return hosts.find(host => host.id === id);
}
