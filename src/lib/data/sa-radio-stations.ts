export interface RadioStation {
    id: string;
    name: string;
    frequency: string;
    location: string;
    genre: string;
    description: string;
    streamUrl: string;
    website: string;
    logo?: string;
}

export const saRadioStations: RadioStation[] = [
    {
        id: "metro-fm",
        name: "Metro FM",
        frequency: "91.0 - 106.3 FM",
        location: "Johannesburg (National)",
        genre: "Urban Contemporary",
        description: "South Africa's premier urban radio station playing the best in R&B, Hip Hop, and Kwaito.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM.mp3",
        website: "https://www.metrofm.co.za"
    },
    {
        id: "5fm",
        name: "5FM",
        frequency: "89.0 - 100.4 FM",
        location: "Johannesburg (National)",
        genre: "Top 40 / Pop",
        description: "South Africa's youth radio station playing the latest hits and chart-toppers.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/5FM.mp3",
        website: "https://www.5fm.co.za"
    },
    {
        id: "radio-2000",
        name: "Radio 2000",
        frequency: "90.0 - 104.5 FM",
        location: "Johannesburg (National)",
        genre: "Adult Contemporary",
        description: "The station for South Africans who want to stay informed and entertained.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_2000.mp3",
        website: "https://www.radio2000.co.za"
    },
    {
        id: "ukhozi-fm",
        name: "Ukhozi FM",
        frequency: "87.5 - 95.0 FM",
        location: "KwaZulu-Natal (National)",
        genre: "Zulu / Maskandi",
        description: "South Africa's biggest radio station broadcasting in isiZulu.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/UKHOZI_FM.mp3",
        website: "https://www.ukhoz ifm.co.za"
    },
    {
        id: "kaya-fm",
        name: "Kaya FM",
        frequency: "95.9 FM",
        location: "Johannesburg",
        genre: "Urban / Talk",
        description: "The voice of the urban black community with music, talk, and culture.",
        streamUrl: "https://stream.kayafm.co.za/kayafm",
        website: "https://www.kayafm.co.za"
    },
    {
        id: "yfm",
        name: "YFM",
        frequency: "99.2 FM",
        location: "Johannesburg",
        genre: "Youth / Hip Hop",
        description: "South Africa's number one youth radio station.",
        streamUrl: "https://yfm.ice.infomaniak.ch/yfm-128.mp3",
        website: "https://www.yfm.co.za"
    },
    {
        id: "jacaranda-fm",
        name: "Jacaranda FM",
        frequency: "94.2 FM",
        location: "Pretoria / Johannesburg",
        genre: "Adult Contemporary",
        description: "Gauteng's feel-good station playing the best music mix.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/JACARANDA_FM.mp3",
        website: "https://www.jacarandafm.com"
    },
    {
        id: "947",
        name: "947",
        frequency: "94.7 FM",
        location: "Johannesburg",
        genre: "Top 40 / Pop",
        description: "Joburg's hottest hit music station.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/947_JOBURG.mp3",
        website: "https://www.947.co.za"
    },
    {
        id: "good-hope-fm",
        name: "Good Hope FM",
        frequency: "94.0 - 97.4 FM",
        location: "Cape Town",
        genre: "Adult Contemporary",
        description: "Cape Town's feel-good station.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/GOODHOPE_FM.mp3",
        website: "https://www.goodhopefm.co.za"
    },
    {
        id: "east-coast-radio",
        name: "East Coast Radio",
        frequency: "94.0 FM",
        location: "Durban",
        genre: "Adult Contemporary",
        description: "KZN's number one hit music station.",
        streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/ECR.mp3",
        website: "https://www.ecr.co.za"
    }
];

export function getStationById(id: string): RadioStation | undefined {
    return saRadioStations.find(station => station.id === id);
}

export function getStationsByGenre(genre: string): RadioStation[] {
    return saRadioStations.filter(station =>
        station.genre.toLowerCase().includes(genre.toLowerCase())
    );
}
