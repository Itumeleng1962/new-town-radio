export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: "Apparel" | "Accessories" | "Digital" | "Vinyl";
    image: string;
    inStock: boolean;
    sizes?: string[];
}

export const products: Product[] = [
    {
        id: "newtown-tee-black",
        name: "Newtown Radio Classic Tee - Black",
        description: "100% cotton heavyweight tee with screen-printed logo. Unisex fit.",
        price: 250,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2680&auto=format&fit=crop",
        inStock: true,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: "newtown-hoodie-yellow",
        name: "Newtown Radio Hoodie - Ripe Lemon",
        description: "Premium heavyweight hoodie in our signature Ripe Lemon color. Embroidered logo.",
        price: 550,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574&auto=format&fit=crop",
        inStock: true,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: "tote-bag",
        name: "Newtown Radio Tote Bag",
        description: "Heavy-duty canvas tote bag. Perfect for records, groceries, or everyday carry.",
        price: 150,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2574&auto=format&fit=crop",
        inStock: true
    },
    {
        id: "snapback-black",
        name: "Newtown Radio Snapback - Black",
        description: "Classic snapback cap with embroidered logo. Adjustable fit.",
        price: 200,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2536&auto=format&fit=crop",
        inStock: true
    },
    {
        id: "sticker-pack",
        name: "Newtown Radio Sticker Pack",
        description: "Set of 5 vinyl stickers featuring various Newtown Radio designs.",
        price: 50,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2574&auto=format&fit=crop",
        inStock: true
    },
    {
        id: "compilation-vol1",
        name: "Newtown Sounds Vol. 1 - Digital Album",
        description: "Curated compilation of tracks from our favorite local artists. 15 tracks, digital download.",
        price: 100,
        category: "Digital",
        image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2574&auto=format&fit=crop",
        inStock: true
    },
    {
        id: "vinyl-sunday-soul",
        name: "Sunday Soul Sessions - Limited Edition Vinyl",
        description: "Limited pressing of Sipho Khumalo's Sunday Soul Sessions mix. 180g vinyl, numbered edition of 500.",
        price: 450,
        category: "Vinyl",
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2670&auto=format&fit=crop",
        inStock: true
    },
    {
        id: "newtown-tee-white",
        name: "Newtown Radio Classic Tee - White",
        description: "100% cotton heavyweight tee with screen-printed logo. Unisex fit.",
        price: 250,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=2574&auto=format&fit=crop",
        inStock: true,
        sizes: ["S", "M", "L", "XL", "XXL"]
    }
];

export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
    return products.filter(product => product.category === category);
}
