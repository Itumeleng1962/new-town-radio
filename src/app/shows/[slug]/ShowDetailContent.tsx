"use client";

import { useLanguage } from '@/lib/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PlayCircle, Clock, Calendar, Download, Share2 } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';

interface ShowDetailContentProps {
    show: any;
    host: any;
    episodes: any[];
}

export default function ShowDetailContent({ show, host, episodes }: ShowDetailContentProps) {
    const { t } = useLanguage();
    const scheduleItems = Array.isArray(show.schedule)
        ? show.schedule
        : show.schedule
            ? (() => {
                const [day, ...rest] = (show.schedule as string).split(' ');
                return [{ day, time: rest.join(' ') || show.schedule }];
            })()
            : [];
    const heroImage = show.image || show.coverImage || '/placeholder.jpg';

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage}
                        alt={show.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/80 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 pb-12">
                    <div className="inline-block px-3 py-1 bg-brand-lemon text-brand-gray text-xs font-bold uppercase rounded-full mb-4">
                        {show.genre}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-4">{show.title}</h1>
                    <p className="text-2xl text-brand-lemon font-bold mb-6">{t('showDetail.with')} {show.host}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {scheduleItems.map((sched: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Calendar size={16} />
                                <span className="font-bold text-sm">{sched.day}</span>
                                <Clock size={16} className="ml-2" />
                                <span className="text-sm">{sched.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Button size="lg">
                            <PlayCircle className="mr-2" /> {t('showDetail.listenLive')}
                        </Button>
                        <Button variant="outline" size="lg">
                            <Share2 className="mr-2" /> {t('showDetail.share')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        <section>
                            <h2 className="text-3xl font-black text-white uppercase mb-4">{t('showDetail.aboutTitle')}</h2>
                            <p className="text-neutral-300 text-lg leading-relaxed">{show.description}</p>
                        </section>

                        {/* Episodes */}
                        <section>
                            <h2 className="text-3xl font-black text-white uppercase mb-6">{t('showDetail.episodesTitle')}</h2>
                            <div className="space-y-4">
                                {episodes.map((episode) => (
                                    <div key={episode.id} className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-brand-lemon/50 transition-all group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-bold text-white group-hover:text-brand-lemon transition-colors mb-2">
                                                    {episode.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-neutral-400">
                                                    <span>{episode.date}</span>
                                                    <span>•</span>
                                                    <span>{episode.duration}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-3 bg-brand-lemon text-brand-gray rounded-full hover:bg-white transition-colors">
                                                    <PlayCircle size={20} fill="currentColor" />
                                                </button>
                                                <button className="p-3 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 transition-colors">
                                                    <Download size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Sidebar Ad */}
                        <AdBanner placement="sidebar" />

                        {/* Host Info */}
                        {host && (
                            <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white uppercase mb-4">{t('showDetail.hostTitle')}</h3>
                                <Link href={`/hosts/${host.id}`}>
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 group">
                                        <Image
                                            src={host.image}
                                            alt={host.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </Link>
                                <h4 className="text-2xl font-bold text-white mb-1">{host.name}</h4>
                                <p className="text-brand-lemon text-sm font-bold mb-4">{host.role}</p>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{host.bio}</p>
                                <Link href={`/hosts/${host.id}`}>
                                    <Button variant="outline" className="w-full">{t('showDetail.viewProfile')}</Button>
                                </Link>
                            </div>
                        )}

                        {/* Subscribe */}
                        <div className="bg-brand-lemon rounded-xl p-6 text-brand-gray">
                            <h3 className="text-xl font-bold uppercase mb-2">{t('showDetail.subscribeTitle')}</h3>
                            <p className="text-sm mb-4">{t('showDetail.subscribeDesc')}</p>
                            <Button className="w-full bg-brand-gray text-white hover:bg-black">{t('showDetail.subscribeButton')}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
