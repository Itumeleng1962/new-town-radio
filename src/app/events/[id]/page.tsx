import { getEventById } from '@/lib/data/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, DollarSign, Share2, Users } from 'lucide-react';
import Link from 'next/link';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
                    <div className="inline-block px-3 py-1 bg-brand-lemon text-brand-gray text-xs font-bold uppercase rounded-full mb-4">
                        {event.category}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-4">{event.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-3xl font-black text-white uppercase mb-4">About This Event</h2>
                            <p className="text-neutral-300 text-lg leading-relaxed">{event.description}</p>
                        </section>

                        {/* Event Details */}
                        <section className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white uppercase mb-6">Event Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Calendar className="w-6 h-6 text-brand-lemon shrink-0 mt-1" />
                                    <div>
                                        <div className="text-white font-bold">Date</div>
                                        <div className="text-neutral-400">{formattedDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-brand-lemon shrink-0 mt-1" />
                                    <div>
                                        <div className="text-white font-bold">Time</div>
                                        <div className="text-neutral-400">{event.time}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-brand-lemon shrink-0 mt-1" />
                                    <div>
                                        <div className="text-white font-bold">Location</div>
                                        <div className="text-neutral-400">{event.location}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <DollarSign className="w-6 h-6 text-brand-lemon shrink-0 mt-1" />
                                    <div>
                                        <div className="text-white font-bold">Price</div>
                                        <div className="text-neutral-400">
                                            {event.price === 0 ? 'Free Entry' : `R${event.price}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Map Placeholder */}
                        <section className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white uppercase mb-4">Location Map</h3>
                            <div className="aspect-video bg-neutral-800 rounded-lg flex items-center justify-center">
                                <div className="text-center text-neutral-500">
                                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                                    <p>Map integration coming soon</p>
                                    <p className="text-sm mt-1">{event.location}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* RSVP Card */}
                        <div className="bg-brand-lemon rounded-xl p-6 text-brand-gray sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-5xl font-black mb-2">
                                    {event.price === 0 ? 'FREE' : `R${event.price}`}
                                </div>
                                {event.price > 0 && <div className="text-sm font-bold">per person</div>}
                            </div>

                            {event.ticketsAvailable ? (
                                <>
                                    <Button className="w-full mb-4 bg-brand-gray text-white hover:bg-black" size="lg">
                                        <Users className="mr-2" />
                                        {event.price === 0 ? 'RSVP Now' : 'Get Tickets'}
                                    </Button>
                                    <div className="text-center text-sm font-bold">
                                        Limited spots available
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <div className="bg-red-600 text-white px-4 py-3 rounded-lg font-bold mb-2">
                                        Sold Out
                                    </div>
                                    <p className="text-sm">Join our mailing list for future events</p>
                                </div>
                            )}
                        </div>

                        {/* Share */}
                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4">Share This Event</h3>
                            <Button variant="outline" className="w-full">
                                <Share2 className="mr-2" size={16} />
                                Share Event
                            </Button>
                        </div>

                        {/* More Events */}
                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4">More Events</h3>
                            <Link href="/events">
                                <Button variant="ghost" className="w-full">
                                    View All Events
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
