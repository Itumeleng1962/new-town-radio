"use client";

import { Button } from '@/components/ui/Button';
import { Heart, DollarSign, Users, Radio, Mic2, Calendar } from 'lucide-react';
import { useState } from 'react';

const quickAmounts = [50, 100, 200, 500];

export default function DonatePage() {
    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [recurring, setRecurring] = useState(false);

    const selectedAmount = amount || (customAmount ? parseInt(customAmount) : null);

    return (
        <div className="pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-b from-brand-lemon to-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <Heart className="w-16 h-16 text-brand-gray mx-auto mb-6" />
                    <h1 className="text-5xl md:text-7xl font-black text-brand-gray uppercase mb-6">
                        Support Newtown Radio
                    </h1>
                    <p className="text-xl text-brand-gray/80 max-w-3xl mx-auto leading-relaxed font-bold">
                        Your donation keeps us on air, ad-free, and independent. Every contribution helps us continue bringing you the best in music, culture, and community.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Donation Form */}
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-black text-white uppercase mb-8">Make a Donation</h2>

                        {/* Quick Amounts */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-neutral-400 uppercase mb-3">Select Amount</label>
                            <div className="grid grid-cols-2 gap-3">
                                {quickAmounts.map((quickAmount) => (
                                    <button
                                        key={quickAmount}
                                        onClick={() => {
                                            setAmount(quickAmount);
                                            setCustomAmount('');
                                        }}
                                        className={`py-4 font-bold text-lg transition-all ${amount === quickAmount
                                                ? 'bg-brand-lemon text-brand-gray'
                                                : 'bg-neutral-800 text-white hover:bg-neutral-700'
                                            }`}
                                    >
                                        R{quickAmount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Amount */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-neutral-400 uppercase mb-3">Or Enter Custom Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                <input
                                    type="number"
                                    placeholder="Custom amount"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setAmount(null);
                                    }}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors text-lg font-bold"
                                />
                            </div>
                        </div>

                        {/* Recurring */}
                        <div className="mb-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={recurring}
                                    onChange={(e) => setRecurring(e.target.checked)}
                                    className="w-5 h-5 accent-brand-lemon"
                                />
                                <span className="text-white font-bold">Make this a monthly donation</span>
                            </label>
                        </div>

                        {/* Summary */}
                        {selectedAmount && (
                            <div className="bg-brand-gray border border-brand-lemon/30 rounded-xl p-6 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-neutral-400">Donation Amount:</span>
                                    <span className="text-2xl font-black text-white">R{selectedAmount}</span>
                                </div>
                                {recurring && (
                                    <div className="text-brand-lemon text-sm font-bold">
                                        Recurring monthly donation
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CTA */}
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={!selectedAmount}
                        >
                            <Heart className="mr-2" />
                            {recurring ? 'Set Up Monthly Donation' : 'Donate Now'}
                        </Button>

                        <p className="text-neutral-500 text-xs text-center mt-4">
                            Secure payment processing. Your information is safe with us.
                        </p>
                    </div>

                    {/* Impact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase mb-6">Your Impact</h2>
                            <p className="text-neutral-300 leading-relaxed mb-8">
                                Every donation, big or small, makes a real difference. Here's how your contribution helps:
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-brand-lemon/10 rounded-lg flex items-center justify-center">
                                    <Radio className="w-6 h-6 text-brand-lemon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Keep Us On Air</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Cover operational costs including streaming infrastructure, studio maintenance, and equipment upgrades.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-brand-lemon/10 rounded-lg flex items-center justify-center">
                                    <Mic2 className="w-6 h-6 text-brand-lemon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Support Our Hosts</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Pay fair wages to our talented hosts and producers who create the content you love.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-brand-lemon/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-brand-lemon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Fund Events & Workshops</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Organize free community events, workshops, and live performances accessible to everyone.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 bg-brand-lemon/10 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-brand-lemon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Grow the Community</h3>
                                    <p className="text-neutral-400 text-sm">
                                        Invest in new shows, support emerging artists, and expand our reach to more listeners.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-3">Prefer Monthly Support?</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Consider becoming a member for exclusive perks and ongoing support.
                            </p>
                            <a href="/membership">
                                <Button variant="outline" className="w-full">View Membership Options</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
