"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Play, User, ShoppingBag, Facebook, Twitter, Instagram, Youtube, Menu, X, LogOut, Bell } from 'lucide-react';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { useCart } from '@/lib/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { languages, LanguageCode } from '@/lib/i18n/i18n-config';
import { Globe } from 'lucide-react';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { useLanguage } from '@/lib/context/LanguageContext';


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { openCart, items } = useCart();
  const { t } = useLanguage();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black text-white py-2 text-xs font-bold uppercase tracking-wider h-10 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-brand-lemon">{t('topBar.liveFrom')}</span>
            <span className="w-1 h-1 bg-neutral-600 rounded-full" />
            <span className="text-neutral-400">{t('topBar.broadcasting')}</span>
          </div>

          <div className="flex items-center gap-6 mx-auto md:mx-0">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-brand-lemon transition-colors"><Facebook size={14} /></a>
              <a href="#" className="hover:text-brand-lemon transition-colors"><Twitter size={14} /></a>
              <a href="#" className="hover:text-brand-lemon transition-colors"><Instagram size={14} /></a>
              <a href="#" className="hover:text-brand-lemon transition-colors"><Youtube size={14} /></a>
            </div>
            <div className="hidden md:block w-px h-3 bg-neutral-800" />
            <Link href="/contact" className="hidden md:block hover:text-brand-lemon transition-colors">
              {t('topBar.advertising')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-brand-lemon shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-12 w-40">
              <Image
                src="/newtownlogo.PNG"
                alt="Newtown Radio"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-4 text-sm font-medium text-black whitespace-nowrap">
            <Link href="/listen" className="hover:text-brand-gray transition-colors font-bold">{t('nav.listenLive')}</Link>
            <Link href="/schedule" className="hover:text-brand-gray transition-colors font-bold">{t('nav.schedule')}</Link>
            <Link href="/shows" className="hover:text-brand-gray transition-colors font-bold">{t('nav.shows')}</Link>
            <Link href="/events" className="hover:text-brand-gray transition-colors font-bold">{t('nav.events')}</Link>
            <Link href="/blog" className="hover:text-brand-gray transition-colors font-bold">{t('nav.blog')}</Link>
            <Link href="/about" className="hover:text-brand-gray transition-colors font-bold">{t('nav.about')}</Link>
            <Link href="/contact" className="hover:text-brand-gray transition-colors font-bold">{t('nav.contact')}</Link>
            <Link href="/shop" className="hover:text-brand-gray transition-colors font-bold">{t('nav.shop')}</Link>
          </div>

          {/* Hamburger Menu Button - visible on screens smaller than xl */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-black hover:text-brand-gray transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector variant="desktop" />

            <GlobalSearch />

            <button
              onClick={openCart}
              className="p-2 text-black hover:text-brand-gray transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gray text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {status === 'authenticated' ? (
              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-black/10">
                <Link href="/notifications" className="p-1 text-black hover:text-brand-gray transition-colors" title={t('nav.notifications')}>
                  <Bell size={20} />
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 text-black hover:text-brand-gray transition-colors font-bold group">
                  <div className="w-8 h-8 bg-black rounded-full text-brand-lemon flex items-center justify-center font-bold text-xs uppercase border border-black/10 group-hover:scale-105 transition-transform">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm truncate max-w-[100px] hidden lg:block">{session?.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-1 text-black hover:text-red-600 transition-colors"
                  title={t('nav.signOut')}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-black hover:text-brand-gray transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-bold">{t('nav.login')}</span>
              </Link>
            )}
            <Link
              href="/listen"
              className="hidden md:flex bg-brand-gray text-brand-lemon px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-black transition-all shadow-lg"
            >
              <Play className="inline-block w-4 h-4 mr-2" fill="currentColor" />
              {t('nav.listenLive')}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-brand-lemon shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-black/10">
                <h2 className="text-lg font-bold text-black">{t('nav.menu')}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-black hover:text-brand-gray transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* User Section */}
                {status === 'authenticated' ? (
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 p-3 bg-black/5 rounded-lg hover:bg-black/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-12 h-12 bg-black rounded-full text-brand-lemon flex items-center justify-center font-bold text-lg uppercase">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-black truncate">{session?.user?.name}</p>
                        <p className="text-xs text-brand-gray">{t('nav.viewDashboard')}</p>
                      </div>
                    </Link>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href="/notifications"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-brand-lemon rounded hover:bg-brand-gray transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Bell size={16} />
                        <span className="text-sm font-bold">{t('nav.notifications')}</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-bold">{t('nav.signOut')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-brand-lemon rounded-lg hover:bg-brand-gray transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-bold">{t('nav.login')} / {t('nav.signUp')}</span>
                    </Link>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-2">
                  <Link
                    href="/listen"
                    className="flex items-center gap-3 px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Play className="w-5 h-5" />
                    {t('nav.listenLive')}
                  </Link>
                  <Link
                    href="/schedule"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.schedule')}
                  </Link>
                  <Link
                    href="/shows"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.shows')}
                  </Link>
                  <Link
                    href="/events"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.events')}
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.blog')}
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.about')}
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.contact')}
                  </Link>
                  <Link
                    href="/shop"
                    className="block px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-colors font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.shop')}
                  </Link>
                </nav>

                {/* Language Selector */}
                <div className="mt-6 pt-6 border-t border-black/10">
                  <LanguageSelector variant="mobile" />
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-black/10 bg-black/5">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <a href="#" className="text-black hover:text-brand-gray transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="text-black hover:text-brand-gray transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="text-black hover:text-brand-gray transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="text-black hover:text-brand-gray transition-colors">
                    <Youtube size={20} />
                  </a>
                </div>
                <p className="text-xs text-center text-brand-gray">{t('topBar.broadcasting')}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
