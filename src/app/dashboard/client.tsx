"use client";

import { useState } from 'react';
import { User, CreditCard, Bell, Settings, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface DashboardClientProps {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        role: string;
        createdAt: string;
    };
    notificationCount: number;
}

export default function DashboardClient({ user, notificationCount }: DashboardClientProps) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase mb-2">{t('dashboard.myAccount').split(' ')[0]} <span className="text-brand-lemon">{t('dashboard.myAccount').split(' ').slice(1).join(' ')}</span></h1>
                    <p className="text-neutral-400">{t('dashboard.manageProfile')}</p>
                </div>
                <Button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    variant="outline"
                    className="text-red-500 border-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500"
                >
                    <LogOut size={16} className="mr-2" /> {t('dashboard.logOut')}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'profile' ? 'bg-brand-lemon text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                    >
                        <User size={18} /> {t('dashboard.profile')}
                    </button>
                    <button
                        onClick={() => setActiveTab('billing')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'billing' ? 'bg-brand-lemon text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                    >
                        <CreditCard size={18} /> {t('dashboard.membershipBilling')}
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'notifications' ? 'bg-brand-lemon text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                    >
                        <Bell size={18} /> {t('nav.notifications')}
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'security' ? 'bg-brand-lemon text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                    >
                        <Shield size={18} /> {t('dashboard.privacySecurity')}
                    </button>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.profileSettings')}</h2>
                                <div className="flex bg-neutral-800 p-4 rounded-xl mb-8 items-center gap-4">
                                    <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center text-2xl font-bold text-white border border-white/10 overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name?.charAt(0) || "U"
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{user.name || "User"}</h3>
                                        <p className="text-neutral-500 text-sm">{t('dashboard.memberSince')} {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="ml-auto">{t('dashboard.changeAvatar')}</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('dashboard.displayName')}</label>
                                        <input defaultValue={user.name || ""} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">{t('auth.email')}</label>
                                        <input defaultValue={user.email || ""} disabled className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-400 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button>{t('dashboard.saveChanges')}</Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.membershipBilling')}</h2>

                                <div className="bg-gradient-to-r from-brand-lemon to-yellow-500 p-6 rounded-xl text-black mb-8">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="bg-black/20 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">{t('dashboard.currentPlan')}</span>
                                            <h3 className="text-3xl font-black uppercase mt-2">{t('dashboard.vipAccess')}</h3>
                                            <p className="text-sm opacity-80 mt-1">{t('dashboard.renewsOn')} Feb 15, 2026</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black">R99<span className="text-sm font-bold">{t('dashboard.mo')}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white mb-4">{t('dashboard.savedPaymentMethods')}</h3>
                                    <div className="flex items-center gap-4 p-4 bg-neutral-800 rounded-lg border border-white/5">
                                        <CreditCard className="text-brand-lemon" />
                                        <div>
                                            <p className="text-white font-bold">•••• •••• •••• 4242</p>
                                            <p className="text-xs text-neutral-500">{t('dashboard.expires')} 12/28</p>
                                        </div>
                                        <button className="ml-auto text-sm text-neutral-400 hover:text-white">{t('common.edit')}</button>
                                    </div>
                                    <button onClick={() => alert("Payment integration coming soon!")} className="mt-4 text-brand-lemon font-bold text-sm hover:underline">+ {t('dashboard.addNewMethod')}</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.notificationPreferences')}</h2>
                                <p className="text-neutral-400 mb-6">{t('dashboard.notificationDescription')}</p>
                                <Link href="/notifications">
                                    <Button variant="outline">{t('dashboard.managePreferences')} →</Button>
                                </Link>
                                <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-brand-lemon/20">
                                    <p className="text-sm text-neutral-300">
                                        <Bell className="inline-block w-4 h-4 mr-2 text-brand-lemon" />
                                        {t('dashboard.youHave')} <strong>{notificationCount} {t('dashboard.unreadNotifications')}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.privacySecurity')}</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg">
                                        <div>
                                            <p className="text-white font-bold">{t('dashboard.changePassword')}</p>
                                            <p className="text-xs text-neutral-500">{t('dashboard.lastChanged')} 3 months ago</p>
                                        </div>
                                        <Button size="sm" variant="outline" onClick={() => alert("Password reset functionality coming soon.")}>{t('dashboard.update')}</Button>
                                    </div>
                                    <div className="pt-8 border-t border-white/10">
                                        <h3 className="text-white font-bold mb-4">{t('dashboard.dataPrivacy')}</h3>
                                        <Link href="/privacy" className="block text-neutral-400 hover:text-white mb-2">{t('dashboard.readPrivacy')}</Link>
                                        <Link href="/terms" className="block text-neutral-400 hover:text-white">{t('dashboard.readTerms')}</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
