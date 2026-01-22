import { getHostById } from '@/lib/data/hosts';
import { getShowsByHost } from '@/lib/data/shows';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Twitter, Instagram, Facebook, Radio } from 'lucide-react';

export default async function HostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const host = getHostById(id);

    if (!host) {
        notFound();
    }

    const hostShows = getShowsByHost(id);

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={host.image}
                        alt={host.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/80 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 pb-12">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-2">{host.name}</h1>
                    <p className="text-2xl text-brand-lemon font-bold mb-6">{host.role}</p>
                    <div className="flex gap-4">
                        {host.social.twitter && (
                            <a href={`https://twitter.com/${host.social.twitter}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                    <Twitter className="mr-2" size={16} /> Twitter
                                </Button>
                            </a>
                        )}
                        {host.social.instagram && (
                            <a href={`https://instagram.com/${host.social.instagram}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                    <Instagram className="mr-2" size={16} /> Instagram
                                </Button>
                            </a>
                        )}
                        {host.social.facebook && (
                            <a href={`https://facebook.com/${host.social.facebook}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                    <Facebook className="mr-2" size={16} /> Facebook
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Bio */}
                        <section>
                            <h2 className="text-3xl font-black text-white uppercase mb-4">About</h2>
                            <p className="text-neutral-300 text-lg leading-relaxed">{host.bio}</p>
                        </section>

                        {/* Specialties */}
                        <section>
                            <h2 className="text-3xl font-black text-white uppercase mb-4">Specialties</h2>
                            <div className="flex flex-wrap gap-3">
                                {host.specialties.map((specialty, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-neutral-900 border border-brand-lemon/30 text-white font-bold text-sm uppercase rounded-full">
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Shows */}
                        {hostShows.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-black text-white uppercase mb-6">Shows</h2>
                                <div className="space-y-4">
                                    {hostShows.map((show) => (
                                        <Link key={show.id} href={`/shows/${show.id}`}>
                                            <div className="bg-neutral-900 border border-white/10 hover:border-brand-lemon/50 rounded-xl p-6 transition-all group flex items-center gap-6">
                                                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={show.image}
                                                        alt={show.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="text-brand-lemon text-xs font-bold uppercase mb-1">{show.genre}</div>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-lemon transition-colors mb-2">
                                                        {show.title}
                                                    </h3>
                                                    <p className="text-neutral-400 text-sm">
                                                        {show.schedule.map(s => `${s.day}s ${s.time}`).join(', ')}
                                                    </p>
                                                </div>
                                                <Radio className="w-8 h-8 text-neutral-700 group-hover:text-brand-lemon transition-colors shrink-0" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Contact */}
                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white uppercase mb-4">Get in Touch</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Interested in booking {host.name.split(' ')[0]} for an event or collaboration?
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
