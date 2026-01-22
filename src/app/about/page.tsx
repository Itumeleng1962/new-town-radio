"use client";

import Image from 'next/image';
import { Users, Radio, Award, Heart, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();
    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/djperforming.jpg"
                    alt="Newtown Radio Studio"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray to-transparent" />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="inline-block px-4 py-2 bg-brand-lemon text-brand-gray font-bold uppercase tracking-wider mb-6">
                        {t('about.hero.since')}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase mb-6">
                        {t('about.hero.title')} <span className="text-brand-lemon">{t('about.hero.story')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                        {t('about.hero.desc')}
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase mb-8">{t('about.mission.title')} <span className="text-brand-lemon">{t('about.mission.vision')}</span></h2>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                    <Radio className="text-brand-lemon w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.missionTitle')}</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {t('about.mission.missionDesc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                    <Heart className="text-brand-lemon w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.visionTitle')}</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {t('about.mission.visionDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden">
                        <Image
                            src="/djperforming.jpg"
                            alt="DJ performing"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-lemon/10 mix-blend-overlay" />
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-neutral-900 py-20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-white uppercase mb-4">{t('about.team.title')} <span className="text-brand-lemon">{t('about.team.teamTitle')}</span></h2>
                            <p className="text-neutral-400">{t('about.team.desc')}</p>
                        </div>
                        <Link href="/hosts" className="hidden md:block text-brand-lemon hover:text-white font-bold uppercase text-sm tracking-wider transition-colors mt-4 md:mt-0">
                            {t('about.team.viewAll')} →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: 'Thabo "T-Man" Molefe', role: 'Station Manager' },
                            { name: 'Sarah Jenkins', role: 'Head of Music' },
                            { name: 'David Ngcobo', role: 'Technical Director' },
                            { name: 'Lerato Khumalo', role: 'Community Manager' }
                        ].map((member, idx) => (
                            <div key={idx} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-neutral-800 group-hover:border-brand-lemon transition-colors">
                                    <Image
                                        src="/placeholder.jpg"
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-neutral-500 uppercase text-xs font-bold tracking-wider">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners & Sponsors */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-black text-white uppercase mb-12">{t('about.partners.title')} <span className="text-brand-lemon">{t('about.partners.partnersTitle')}</span></h2>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Logos */}
                    <div className="text-2xl font-black text-white">SOUNDCORP</div>
                    <div className="text-2xl font-black text-white">EVENTPRO</div>
                    <div className="text-2xl font-black text-white">MUSIC_SA</div>
                    <div className="text-2xl font-black text-white">CITY_ARTS</div>
                    <div className="text-2xl font-black text-white">TECH_GEAR</div>
                </div>
                <div className="mt-16">
                    <p className="text-neutral-400 mb-6">{t('about.partners.interested')}</p>
                    <Link href="/advertise">
                        <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase hover:bg-white hover:text-black transition-all rounded-full">
                            {t('about.partners.button')}
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
