import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const blogPosts = [
    {
        id: '1',
        title: 'The Rise of Amapiano: How South African Sound Took Over the World',
        excerpt: 'From township parties to global charts, we explore the meteoric rise of Amapiano and its impact on the music industry.',
        category: 'Music Culture',
        author: 'Lindiwe Mthembu',
        date: '2026-01-15',
        image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop',
        featured: true
    },
    {
        id: '2',
        title: 'Behind the Mic: A Day in the Life of a Radio Host',
        excerpt: 'We follow DJ Tshepo through a typical day at Newtown Radio, from prep to post-show wind-down.',
        category: 'Behind the Scenes',
        author: 'Sipho Khumalo',
        date: '2026-01-12',
        image: 'https://images.unsplash.com/photo-1478737270239-2f52b27e90f3?q=80&w=2676&auto=format&fit=crop',
        featured: false
    },
    {
        id: '3',
        title: 'Community Radio in the Digital Age: Why It Still Matters',
        excerpt: 'In an era of streaming and podcasts, community radio remains a vital voice for local communities.',
        category: 'Opinion',
        author: 'Naledi Mokoena',
        date: '2026-01-10',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop',
        featured: false
    },
    {
        id: '4',
        title: 'Newtown Best: 10 Artists You Need to Know Right Now',
        excerpt: 'Our curated list of emerging artists from Johannesburg who are about to blow up.',
        category: 'Music Culture',
        author: 'Zara Okafor',
        date: '2026-01-08',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop',
        featured: false
    },
    {
        id: '5',
        title: 'The Art of the Mix: DJ Thabo Shares His Secrets',
        excerpt: 'Hip-hop legend DJ Thabo breaks down his creative process and shares tips for aspiring DJs.',
        category: 'Interviews',
        author: 'Marcus van der Berg',
        date: '2026-01-05',
        image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2670&auto=format&fit=crop',
        featured: false
    },
    {
        id: '6',
        title: 'Poetry in Motion: The Spoken Word Renaissance',
        excerpt: 'Exploring the resurgence of spoken word poetry in Johannesburg creative scene.',
        category: 'Culture',
        author: 'Naledi Mokoena',
        date: '2026-01-03',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2670&auto=format&fit=crop',
        featured: false
    }
];

const categories = ['All', 'Music Culture', 'Behind the Scenes', 'Interviews', 'Opinion', 'Culture'];

export default function BlogPage() {
    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
                    News & <span className="text-brand-lemon">Culture</span>
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    Stories from the heart of Johannesburg music and culture scene.
                </p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
                <Link href={`/blog/${featuredPost.id}`}>
                    <div className="group relative h-[500px] rounded-2xl overflow-hidden mb-12 hover:scale-[1.02] transition-transform">
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <div className="inline-block px-3 py-1 bg-brand-lemon text-brand-gray text-xs font-bold uppercase rounded-full mb-4">
                                Featured
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-3xl">
                                {featuredPost.title}
                            </h2>
                            <p className="text-neutral-300 text-lg mb-6 max-w-2xl">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-neutral-400">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    {featuredPost.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="px-4 py-2 bg-neutral-900 text-neutral-400 hover:bg-brand-lemon hover:text-brand-gray font-bold text-sm uppercase tracking-wider transition-all"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="group bg-neutral-900 border border-white/10 hover:border-brand-lemon/50 rounded-xl overflow-hidden transition-all">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-brand-lemon text-xs font-bold uppercase mb-2">{post.category}</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-lemon transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <span>{post.author}</span>
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                    Load More Articles
                    <ArrowRight className="ml-2" size={16} />
                </Button>
            </div>
        </div>
    );
}
