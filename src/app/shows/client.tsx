"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, PlayCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ShowsClientProps {
    initialShows: any[];
}

export default function ShowsPage({ initialShows }: ShowsClientProps) {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string>('All');

    // Extract genres from real data, default to 'Music' if missing
    const genres = ['All', ...Array.from(new Set(initialShows.map(show => show.genre || 'Music')))];

    const filteredShows = initialShows.filter(show => {
        const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (show.host?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'All' || (show.genre || 'Music') === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
                    {t('shows.title')} <span className="text-brand-lemon">{t('shows.showsTitle')}</span>
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    {t('shows.desc')}
                </p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                        type="text"
                        placeholder={t('shows.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
                    />
                </div>

                {/* Genre Filter */}
                <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 font-bold text-sm uppercase tracking-wider transition-all ${selectedGenre === genre
                                ? 'bg-brand-lemon text-brand-gray'
                                : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                }`}
                        >
                            {genre === 'All' ? t('shows.genre.all') : genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Shows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShows.map((show) => (
                    <Link key={show.id} href={`/shows/${show.id}`}>
                        <div className="group relative aspect-square overflow-hidden bg-neutral-800 rounded-xl">
                            <div className="relative w-full h-full">
                                <Image
                                    src={show.image || 'https://placehold.co/600x600/1a1a1a/FFF?text=Radio+Show'}
                                    alt={show.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <div className="text-brand-lemon text-xs font-bold uppercase mb-2">{show.genre || 'Music'}</div>
                                <h3 className="text-2xl font-bold text-white mb-1">{show.title}</h3>
                                <p className="text-neutral-400 text-sm mb-3">{t('shows.card.with')} {show.host?.name || t('shows.tba')}</p>
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <Clock size={14} />
                                    {show.schedule || t('shows.tba')}
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 mt-4">
                                    <PlayCircle className="w-8 h-8 text-brand-lemon" />
                                    <span className="text-sm font-bold uppercase text-white">{t('shows.viewShow')}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredShows.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-neutral-500 text-lg">{t('shows.empty')}</p>
                </div>
            )}
        </div>
    );
}
