"use client";

import { Button } from '@/components/ui/Button';
import { getCurrentShow } from '@/lib/data/schedule';
import { Play, Calendar, Radio, Users, Heart, TrendingUp, Mic2, Headphones } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import AdBanner from '@/components/ads/AdBanner';

type HomeShow = {
  id: string;
  title: string;
  host: string;
  hostId: string;
  description: string;
  genre: string;
  image: string;
  schedule: any;
  featured: boolean;
};

type HomeEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  price: number;
  ticketsAvailable: boolean;
};

export default function HomePage() {
  const { t } = useLanguage();
  const currentShow = getCurrentShow();
  const [scrollY, setScrollY] = useState(0);
  const [featuredShows, setFeaturedShows] = useState<HomeShow[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<HomeEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showsRes, eventsRes] = await Promise.all([
          fetch("/api/featured-shows"),
          fetch("/api/upcoming-events"),
        ]);

        if (showsRes.ok) {
          const showsData = await showsRes.json();
          setFeaturedShows(showsData);
        }

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setUpcomingEvents(eventsData);
        }
      } catch (error) {
        console.error("Failed to load home data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gray via-neutral-900 to-black">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-lemon/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-lemon/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-lemon/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-brand-lemon/10 border border-brand-lemon/30 px-4 py-2 rounded-full mb-6 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-brand-lemon text-sm font-bold uppercase">{t('home.hero.liveNow')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase mb-6 leading-none">
              {t('home.hero.titlePart1')}
              <br />
              <span className="bg-gradient-to-r from-brand-lemon via-white to-brand-lemon bg-clip-text text-transparent animate-gradient">
                {t('home.hero.titlePart2')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/listen">
                <Button size="lg" className="group">
                  <Play className="mr-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                  {t('home.hero.listenLive')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-brand-lemon rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* LIVE NOW STRIP */}
      {currentShow && (
        <section className="bg-gradient-to-r from-brand-lemon via-yellow-400 to-brand-lemon py-6 animate-gradient">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <div className="w-1 h-8 bg-brand-gray rounded-full animate-pulse" />
                  <div className="w-1 h-8 bg-brand-gray rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-8 bg-brand-gray rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <div>
                  <div className="text-brand-gray text-xs font-bold uppercase mb-1">{t('home.onAir.now')}</div>
                  <div className="text-brand-gray font-black text-xl">{currentShow.showTitle}</div>
                  <div className="text-brand-gray/80 text-sm">{t('home.onAir.with')} {currentShow.host}</div>
                </div>
              </div>
              <Link href="/listen">
                <Button className="bg-brand-gray text-white hover:bg-black">
                  <Headphones className="mr-2" />
                  {t('home.onAir.tuneIn')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* STATS SECTION */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50K+', label: t('home.stats.monthlyListeners') },
              { icon: Radio, value: '8', label: t('home.stats.originalShows') },
              { icon: Calendar, value: '24/7', label: t('home.stats.liveBroadcasting') },
              { icon: Heart, value: '100%', label: t('home.stats.independent') }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group hover:scale-105 transition-transform">
                <stat.icon className="w-12 h-12 text-brand-lemon mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-neutral-400 text-sm uppercase font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOMEPAGE AD */}
      <section className="py-8 container mx-auto px-4">
        <AdBanner placement="homepage" className="max-w-4xl mx-auto" />
      </section>

      {/* BANNER AD */}
      <section className="py-8 container mx-auto px-4">
        <AdBanner placement="banner" className="max-w-4xl mx-auto" />
      </section>

      {/* FEATURED SHOWS */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
            {t('home.featured.title')} <span className="text-brand-lemon">{t('home.featured.shows')}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {t('home.featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featuredShows.map((show, idx) => (
            <Link key={show.id} href={`/shows/${show.id}`}>
              <div
                className="group relative aspect-square overflow-hidden bg-neutral-800 rounded-2xl hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={show.image}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-brand-lemon text-xs font-bold uppercase mb-2 transform group-hover:translate-x-2 transition-transform">
                    {show.genre}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 transform group-hover:translate-x-2 transition-transform">
                    {show.title}
                  </h3>
                  <p className="text-neutral-300 text-sm mb-3 transform group-hover:translate-x-2 transition-transform">
                    with {show.host}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <Play className="w-6 h-6 text-brand-lemon" fill="currentColor" />
                    <span className="text-sm font-bold uppercase text-white">{t('home.featured.listenNow')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shows">
            <Button variant="outline" size="lg">
              {t('home.featured.viewAll')}
            </Button>
          </Link>
        </div>
      </section>

      {/* BETWEEN CONTENT AD */}
      <section className="py-8 container mx-auto px-4">
        <AdBanner placement="between-content" className="max-w-4xl mx-auto" />
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-24 bg-neutral-900 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
              {t('home.events.title')} <span className="text-brand-lemon">{t('home.events.eventsTitle')}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {t('home.events.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event, idx) => {
              const eventDate = new Date(event.date);
              const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
              const day = eventDate.getDate();

              return (
                <div
                  key={event.id}
                  className="group bg-brand-gray border border-white/10 hover:border-brand-lemon/50 rounded-xl overflow-hidden transition-all hover:scale-105"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex flex-col items-center justify-center bg-brand-lemon text-brand-gray w-16 h-16 rounded-lg font-bold leading-none shadow-lg">
                      <span className="text-xs uppercase">{month}</span>
                      <span className="text-2xl">{day}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-brand-lemon text-xs font-bold uppercase mb-2">{event.category}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-lemon transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <Link href={`/events/${event.id}`}>
                      <Button size="sm" className="w-full">
                        {event.price === 0 ? t('home.events.rsvpFree') : `${t('home.events.getTickets')} - R${event.price}`}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="outline" size="lg">
                {t('home.events.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY NEWTOWN */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
            {t('home.why.title')} <span className="text-brand-lemon">{t('home.why.newtownRadio')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Radio,
              title: t('home.why.independentTitle'),
              description: t('home.why.independentDesc')
            },
            {
              icon: Users,
              title: t('home.why.communityTitle'),
              description: t('home.why.communityDesc')
            },
            {
              icon: Mic2,
              title: t('home.why.diverseTitle'),
              description: t('home.why.diverseDesc')
            },
            {
              icon: TrendingUp,
              title: t('home.why.evolvingTitle'),
              description: t('home.why.evolvingDesc')
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group text-center p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-brand-lemon/50 hover:scale-105 transition-all"
            >
              <div className="w-16 h-16 bg-brand-lemon/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-lemon/20 transition-colors">
                <item.icon className="w-8 h-8 text-brand-lemon group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-lemon transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-lemon via-yellow-400 to-brand-lemon animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-brand-gray uppercase mb-6">
            {t('home.membership.title')}
          </h2>
          <p className="text-brand-gray/80 text-xl mb-8 max-w-2xl mx-auto font-bold">
            {t('home.membership.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership">
              <Button size="lg" className="bg-brand-gray text-white hover:bg-black">
                <Heart className="mr-2" />
                {t('home.membership.button')}
              </Button>
            </Link>
            <Link href="/donate">
              <Button size="lg" className="bg-transparent border-2 border-brand-gray text-brand-gray hover:bg-brand-gray hover:text-white">
                {t('home.membership.donate')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-black text-white uppercase mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-neutral-400 mb-8">
            {t('home.newsletter.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('home.newsletter.placeholder')}
              className="flex-grow px-6 py-4 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
            />
            <Button size="lg">{t('home.newsletter.button')}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
