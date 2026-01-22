"use client";

import { useState } from 'react';
import { MessageSquare, Mic2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { hosts } from '@/lib/data/hosts';
import Image from 'next/image';

export default function MessagesPage() {
    const [activeTab, setActiveTab] = useState<'hosts' | 'requests'>('hosts');
    const [selectedHost, setSelectedHost] = useState<string | null>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Message sent! The host will see it shortly.');
        setSelectedHost(null);
    };

    const handleSongRequest = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Request submitted! Keep listening.');
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-white uppercase mb-4">
                    Community <span className="text-brand-lemon">Messages</span>
                </h1>
                <p className="text-neutral-400">Connect with your favorite hosts or request a track.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setActiveTab('hosts')}
                    className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'hosts'
                            ? 'bg-brand-lemon text-brand-gray'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white'
                        }`}
                >
                    Message a Host
                </button>
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'requests'
                            ? 'bg-brand-lemon text-brand-gray'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white'
                        }`}
                >
                    Song Request
                </button>
            </div>

            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
                {activeTab === 'hosts' ? (
                    <>
                        {!selectedHost ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {hosts.map((host) => (
                                    <button
                                        key={host.id}
                                        onClick={() => setSelectedHost(host.id)}
                                        className="flex items-center gap-4 p-4 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all text-left group"
                                    >
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-600 group-hover:border-brand-lemon transition-colors">
                                            <Image src={host.image} alt={host.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-brand-lemon transition-colors">{host.name}</h3>
                                            <p className="text-xs text-neutral-400">{host.role}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleSendMessage} className="max-w-xl mx-auto">
                                <button
                                    type="button"
                                    onClick={() => setSelectedHost(null)}
                                    className="text-neutral-400 hover:text-white text-sm mb-6"
                                >
                                    ← Back to hosts
                                </button>

                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Message to <span className="text-brand-lemon">{hosts.find(h => h.id === selectedHost)?.name}</span>
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Subject</label>
                                        <input required className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Your Message</label>
                                        <textarea required rows={5} className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none resize-none"></textarea>
                                    </div>
                                    <Button type="submit" className="w-full">Send Message</Button>
                                </div>
                            </form>
                        )}
                    </>
                ) : (
                    <form onSubmit={handleSongRequest} className="max-w-xl mx-auto text-center">
                        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-lemon">
                            <Mic2 size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Request a Track</h2>
                        <p className="text-neutral-400 mb-8">What do you want to hear next on Newtown Radio?</p>

                        <div className="space-y-6 text-left">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Artist Name</label>
                                <input required placeholder="e.g. Black Coffee" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Track Title</label>
                                <input required placeholder="e.g. Drive" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Dedication (Optional)</label>
                                <textarea rows={3} placeholder="Shoutout to the crew..." className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none resize-none"></textarea>
                            </div>
                            <Button type="submit" size="lg" className="w-full">Submit Request</Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
