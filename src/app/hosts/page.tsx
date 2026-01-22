import { hosts } from '@/lib/data/hosts';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function HostsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
                    Hosts & <span className="text-brand-lemon">Crew</span>
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    Meet the voices behind Newtown Radio. Our diverse team of hosts brings passion, expertise, and authentic perspectives to the airwaves.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hosts.map((host) => (
                    <div key={host.id} className="group bg-neutral-900 border border-white/10 hover:border-brand-lemon/50 rounded-xl overflow-hidden transition-all">
                        <Link href={`/hosts/${host.id}`}>
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={host.image}
                                    alt={host.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="p-6">
                            <Link href={`/hosts/${host.id}`}>
                                <h3 className="text-2xl font-bold text-white group-hover:text-brand-lemon transition-colors mb-1">
                                    {host.name}
                                </h3>
                            </Link>
                            <p className="text-brand-lemon text-sm font-bold mb-3">{host.role}</p>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                {host.bio}
                            </p>

                            {/* Specialties */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {host.specialties.slice(0, 3).map((specialty, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs font-bold uppercase rounded">
                                        {specialty}
                                    </span>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {host.social.twitter && (
                                    <a href={`https://twitter.com/${host.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-lemon transition-colors">
                                        <Twitter size={18} />
                                    </a>
                                )}
                                {host.social.instagram && (
                                    <a href={`https://instagram.com/${host.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-lemon transition-colors">
                                        <Instagram size={18} />
                                    </a>
                                )}
                                {host.social.facebook && (
                                    <a href={`https://facebook.com/${host.social.facebook}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-lemon transition-colors">
                                        <Facebook size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
