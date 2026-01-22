"use client";

import { useState } from 'react';
import { Bell, Calendar, Percent, Music, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function NotificationsPage() {
    const { t } = useLanguage();
    const [preferences, setPreferences] = useState({
        shows: true,
        events: true,
        promotions: false,
        mentions: true
    });

    const [notifications] = useState([
        {
            id: 1,
            type: 'show',
            title: 'The Block Party is Live!',
            message: 'DJ T-Man is now live on air. Tune in now!',
            time: '12:00 PM',
            read: false
        },
        {
            id: 2,
            type: 'event',
            title: 'New Event: Jazz Night',
            message: 'Tickets are now available for our monthly Jazz Night.',
            time: 'Yesterday',
            read: true
        },
        {
            id: 3,
            type: 'promo',
            title: 'Summer Sale',
            message: 'Get 20% off all merch this weekend only.',
            time: '2 days ago',
            read: true
        }
    ]);

    const handleSave = () => {
        toast.success(t('notifications.savedSuccess'));
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-white uppercase mb-4">
                    {t('notifications.title')}
                </h1>
                <p className="text-neutral-400">{t('notifications.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Settings */}
                <div className="md:col-span-1 space-y-8">
                    <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-brand-lemon" /> {t('notifications.preferences')}
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Music size={16} /> {t('notifications.newShows')}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.shows}
                                    onChange={(e) => setPreferences({ ...preferences, shows: e.target.checked })}
                                    className="w-5 h-5 accent-brand-lemon rounded"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Calendar size={16} /> {t('notifications.events')}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.events}
                                    onChange={(e) => setPreferences({ ...preferences, events: e.target.checked })}
                                    className="w-5 h-5 accent-brand-lemon rounded"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-neutral-300">
                                    <Percent size={16} /> {t('notifications.promotions')}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.promotions}
                                    onChange={(e) => setPreferences({ ...preferences, promotions: e.target.checked })}
                                    className="w-5 h-5 accent-brand-lemon rounded"
                                />
                            </div>
                        </div>

                        <Button onClick={handleSave} className="w-full mt-8">
                            <Save size={16} className="mr-2" /> {t('notifications.savePreferences')}
                        </Button>
                    </div>
                </div>

                {/* History */}
                <div className="md:col-span-2">
                    <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">{t('notifications.recent')}</h2>
                        </div>

                        <div className="divide-y divide-white/5">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-6 flex items-start gap-4 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-white/5' : ''}`}
                                >
                                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.read ? 'bg-brand-lemon' : 'bg-transparent'}`} />
                                    <div>
                                        <h3 className="text-white font-bold mb-1">{notification.title}</h3>
                                        <p className="text-neutral-400 text-sm mb-2">{notification.message}</p>
                                        <span className="text-xs text-neutral-600 uppercase tracking-wider">{notification.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 text-center border-t border-white/10">
                            <button className="text-sm text-neutral-500 hover:text-white transition-colors">
                                {t('notifications.viewAllHistory')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
