"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-neutral-900 border-t border-white/10 pt-16 pb-32 md:pb-16 text-neutral-400 text-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand & About */}
                    <div className="space-y-6">
                        <div className="relative h-10 w-32 opacity-80">
                            <Image
                                src="/newtownlogo.PNG"
                                alt="Newtown Radio"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="leading-relaxed">
                            {t('footer.description')}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-brand-lemon transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-brand-lemon transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-brand-lemon transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-brand-lemon transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/shows" className="hover:text-brand-lemon transition-colors">{t('nav.shows')}</Link></li>
                            <li><Link href="/events" className="hover:text-brand-lemon transition-colors">{t('nav.events')}</Link></li>
                            <li><Link href="/blog" className="hover:text-brand-lemon transition-colors">{t('nav.blog')}</Link></li>
                            <li><Link href="/shop" className="hover:text-brand-lemon transition-colors">{t('nav.shop')}</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.connect')}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/notifications" className="hover:text-brand-lemon transition-colors">{t('nav.notifications')}</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-lemon transition-colors">{t('nav.contact')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-lemon transition-colors">{t('footer.privacy')}</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-lemon transition-colors">{t('footer.terms')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('nav.contact')}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 shrink-0 text-brand-lemon" />
                                <span>123 Pulse Avenue, Newtown<br />Johannesburg, 2001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 shrink-0 text-brand-lemon" />
                                <a href="mailto:hello@newtownradio.co.za" className="hover:text-brand-lemon transition-colors">hello@newtownradio.co.za</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 shrink-0 text-brand-lemon" />
                                <a href="tel:+27101234567" className="hover:text-brand-lemon transition-colors">+27 10 123 4567</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-xs text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} Newtown Radio. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
}
