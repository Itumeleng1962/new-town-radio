"use client";

import { useLanguage } from '@/lib/context/LanguageContext';
import { Play, Clock, Share2, Heart } from 'lucide-react';

interface ListenContentProps {
    episodes: any[];
}

export default function ListenContent({ episodes }: ListenContentProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-neutral-900 text-white pt-20">
            <div className="container mx-auto px-4 py-8">

                {/* Main Player Area / Hero */}
                <div className="bg-black border border-white/10 rounded-2xl p-6 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 bg-neutral-800 rounded-full overflow-hidden border-4 border-brand-lemon shadow-[0_0_50px_rgba(223,242,56,0.2)] animate-spin-slow">
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-bold text-2xl uppercase">
                            {t('listen.liveAir')}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
                            {t('listen.liveNow')}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-4 leading-none">
                            {t('listen.hero.title')} <span className="text-brand-lemon">{t('listen.hero.radio')}</span>
                        </h1>
                        <p className="text-neutral-400 text-lg md:text-xl mb-8 max-w-xl">
                            {t('listen.hero.desc')}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <button className="bg-brand-lemon text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform flex items-center shadow-lg shadow-brand-lemon/20">
                                <Play fill="currentColor" className="mr-2" /> {t('listen.hero.listen')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Broadcasts */}
                <h2 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">
                    {t('listen.recent.title')}
                </h2>

                <div className="space-y-4">
                    {episodes.length === 0 ? (
                        <div className="text-center py-12 bg-neutral-800 rounded-xl">
                            <p className="text-neutral-500">{t('listen.recent.empty')}</p>
                        </div>
                    ) : (
                        episodes.map((episode) => (
                            <div key={episode.id} className="bg-neutral-900 border border-white/10 hover:border-brand-lemon/50 rounded-xl p-4 flex items-center gap-4 group transition-colors">
                                <div className="w-16 h-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-600 shrink-0">
                                    <Play size={24} className="text-white group-hover:text-brand-lemon" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 text-xs text-brand-lemon font-bold mb-1 uppercase">
                                        <Clock size={12} />
                                        {new Date(episode.releaseDate).toLocaleDateString()} • {episode.duration} min
                                    </div>
                                    <h3 className="text-lg font-bold text-white truncate group-hover:text-brand-lemon transition-colors">
                                        {episode.title}
                                    </h3>
                                    <p className="text-sm text-neutral-400 truncate">
                                        {episode.show?.title} {episode.show?.hostId ? '' : ''}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-neutral-500 hover:text-white transition-colors" title="Like">
                                        <Heart size={18} />
                                    </button>
                                    <button className="p-2 text-neutral-500 hover:text-white transition-colors" title="Share">
                                        <Share2 size={18} />
                                    </button>
                                    {episode.audioUrl && episode.audioUrl !== '#' && (
                                        <a
                                            href={episode.audioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-brand-lemon transition-colors shadow-lg ml-2"
                                        >
                                            <Play size={16} fill="currentColor" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
