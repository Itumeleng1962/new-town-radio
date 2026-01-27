"use client";

import { useLanguage } from '@/lib/context/LanguageContext';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';

interface Event {
    id: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    ticketLink: string | null;
    image: string | null;
}

interface EventsContentProps {
    events: Event[];
}

export default function EventsContent({ events }: EventsContentProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-neutral-900 text-white pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-6xl font-black text-brand-lemon mb-12 uppercase tracking-tighter">
                    {t('events.title')}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.length === 0 ? (
                        <div className="col-span-3 text-center py-20 bg-neutral-800 rounded-xl border border-white/10">
                            <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{t('events.noEventsTitle')}</h3>
                            <p className="text-neutral-400">{t('events.noEventsMessage')}</p>
                        </div>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="group bg-black border border-white/10 rounded-xl overflow-hidden hover:border-brand-lemon transition-colors">
                                <div className="relative h-48 w-full bg-neutral-800">
                                    {/* Fallback image or dynamic if available */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <Calendar size={48} />
                                    </div>
                                    {/* <Image 
                    src={event.image || '/events/default.jpg'} 
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  /> */}
                                    <div className="absolute top-4 right-4 bg-brand-lemon text-black px-3 py-1 font-bold text-xs uppercase rounded">
                                        {event.ticketLink ? t('events.ticketsAvailable') : t('events.freeEntry')}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-brand-lemon text-sm font-bold mb-3 uppercase">
                                        <Calendar size={14} />
                                        {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-3 uppercase leading-none">
                                        {event.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-4">
                                        <MapPin size={14} />
                                        {event.location}
                                    </div>

                                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {event.description}
                                    </p>

                                    {event.ticketLink ? (
                                        <a
                                            href={event.ticketLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-white text-black text-center py-3 font-bold uppercase hover:bg-brand-lemon transition-colors"
                                        >
                                            {t('events.buyTickets')} <Ticket className="inline-block w-4 h-4 ml-2" />
                                        </a>
                                    ) : (
                                        <button disabled className="block w-full bg-neutral-800 text-neutral-500 text-center py-3 font-bold uppercase cursor-not-allowed">
                                            {t('events.infoOnly')}
                                        </button>
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
