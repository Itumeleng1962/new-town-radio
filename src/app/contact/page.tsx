"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLanguage();
    const [inquiryType, setInquiryType] = useState('general');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('contact.form.sentSuccess'));
    };

    return (
        <div className="pb-20">
            <div className="bg-neutral-900 border-b border-white/5 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6">
                        {t('contact.title')} <span className="text-brand-lemon">{t('contact.touch')}</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-white uppercase mb-8">{t('contact.form.title')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('contact.form.firstName')}</label>
                                    <input required className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('contact.form.lastName')}</label>
                                    <input required className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('contact.form.email')}</label>
                                <input type="email" required className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('contact.form.inquiryType')}</label>
                                <select
                                    value={inquiryType}
                                    onChange={(e) => setInquiryType(e.target.value)}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none transition-colors"
                                >
                                    <option value="general">{t('contact.form.types.general')}</option>
                                    <option value="booking">{t('contact.form.types.booking')}</option>
                                    <option value="music">{t('contact.form.types.music')}</option>
                                    <option value="advertising">{t('contact.form.types.advertising')}</option>
                                    <option value="feedback">{t('contact.form.types.feedback')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('contact.form.message')}</label>
                                <textarea required rows={6} className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none transition-colors resize-none"></textarea>
                            </div>

                            <Button size="lg" className="w-full">
                                <Send className="mr-2" size={18} /> {t('contact.form.send')}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase mb-8">{t('contact.info.title')}</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                        <MapPin className="text-brand-lemon w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{t('contact.info.addressTitle')}</h3>
                                        <p className="text-neutral-400" dangerouslySetInnerHTML={{ __html: t('contact.info.address') }} />
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                        <Mail className="text-brand-lemon w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{t('contact.info.emailTitle')}</h3>
                                        <p className="text-neutral-400">hello@newtownradio.co.za</p>
                                        <p className="text-neutral-500 text-sm">bookings@newtownradio.co.za</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                        <Phone className="text-brand-lemon w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{t('contact.info.callTitle')}</h3>
                                        <p className="text-neutral-400">+27 10 123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase mb-6">{t('contact.social.follow')}</h2>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-brand-lemon hover:text-black transition-all">
                                    <Instagram size={24} />
                                </a>
                                <a href="#" className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-brand-lemon hover:text-black transition-all">
                                    <Twitter size={24} />
                                </a>
                                <a href="#" className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-brand-lemon hover:text-black transition-all">
                                    <Facebook size={24} />
                                </a>
                                <a href="#" className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-brand-lemon hover:text-black transition-all">
                                    <Youtube size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase mb-6">{t('contact.location.title')}</h2>
                            <div className="h-64 bg-neutral-800 rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all">
                                {/* This would be a Google Maps iframe in production */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.342617637845!2d28.031548876402868!3d-26.202357977073574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ea681283995%3A0xe677564q1247!2sNewtown%2C%20Johannesburg!5e0!3m2!1sen!2sza!4v1705663671234!5m2!1sen!2sza"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
