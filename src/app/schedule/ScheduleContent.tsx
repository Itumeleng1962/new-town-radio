"use client";

import { useLanguage } from '@/lib/context/LanguageContext';
import { Clock, Radio, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ScheduleContentProps {
    shows: any[];
}

export default function ScheduleContent({ shows }: ScheduleContentProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-neutral-900 text-white pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-6xl font-black text-brand-lemon mb-12 uppercase tracking-tighter">
                    {t('schedule.title')}
                </h1>

                <div className="space-y-4">
                    {shows.length === 0 ? (
                        <div className="text-center py-20 bg-neutral-800 rounded-xl border border-white/10">
                            <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{t('schedule.empty.title')}</h3>
                            <p className="text-neutral-400">{t('schedule.empty.desc')}</p>
                        </div>
                    ) : (
                        shows.map((show) => (
                            <Link key={show.id} href={`/shows/${show.id}`}>
                                <div className="bg-neutral-900 border border-white/10 hover:border-brand-lemon/50 rounded-xl p-6 transition-all group hover:bg-neutral-800/50">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 text-brand-lemon text-sm font-bold mb-2 uppercase tracking-wider">
                                                <Clock size={16} />
                                                {show.schedule}
                                            </div>
                                            <h3 className="text-2xl font-black text-white group-hover:text-brand-lemon transition-colors mb-1 uppercase">
                                                {show.title}
                                            </h3>
                                            <p className="text-neutral-400 font-medium">{t('schedule.card.with')} <span className="text-white">{show.host?.name || 'TBA'}</span></p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-4">
                                            <span className="hidden md:inline-block text-xs font-bold uppercase text-neutral-500 group-hover:text-white transition-colors">
                                                {t('schedule.card.view')}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-brand-lemon group-hover:text-black transition-colors">
                                                <Radio size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
