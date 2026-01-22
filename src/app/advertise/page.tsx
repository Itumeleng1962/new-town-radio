"use client";

import { Button } from '@/components/ui/Button';
import { Radio, Users, TrendingUp, Target, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdvertisePage() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        package: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your interest! Our advertising team will contact you within 24 hours.');
    };

    return (
        <div className="pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-b from-neutral-900 to-brand-gray py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6">
                        Advertise <span className="text-brand-lemon">With Us</span>
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                        Reach an engaged, culturally-aware audience in Johannesburg and beyond. Partner with Newtown Radio to amplify your brand.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {/* Why Advertise */}
                <section className="mb-20">
                    <h2 className="text-4xl font-black text-white uppercase mb-12 text-center">
                        Why <span className="text-brand-lemon">Newtown Radio?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Users,
                                title: '50K+ Monthly Listeners',
                                description: 'Reach a diverse, engaged audience across Johannesburg and South Africa.'
                            },
                            {
                                icon: Target,
                                title: 'Targeted Demographics',
                                description: 'Connect with urban, culturally-aware 18-45 year olds.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'High Engagement',
                                description: 'Our listeners are active participants, not passive consumers.'
                            },
                            {
                                icon: Radio,
                                title: 'Multiple Touchpoints',
                                description: 'Radio, website, social media, events, and newsletters.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-brand-lemon/50 transition-all">
                                <item.icon className="w-12 h-12 text-brand-lemon mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-neutral-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Advertising Packages */}
                <section className="mb-20">
                    <h2 className="text-4xl font-black text-white uppercase mb-12 text-center">
                        Advertising <span className="text-brand-lemon">Packages</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Bronze',
                                price: 'R5,000',
                                period: '/month',
                                features: [
                                    '10 x 30-second spots per week',
                                    'Website banner ad (sidebar)',
                                    'Social media mention (1x/month)',
                                    'Newsletter mention (1x/month)'
                                ]
                            },
                            {
                                name: 'Silver',
                                price: 'R10,000',
                                period: '/month',
                                popular: true,
                                features: [
                                    '20 x 30-second spots per week',
                                    'Website banner ad (homepage)',
                                    'Social media mentions (2x/week)',
                                    'Newsletter feature (2x/month)',
                                    'Event sponsorship opportunity'
                                ]
                            },
                            {
                                name: 'Gold',
                                price: 'R20,000',
                                period: '/month',
                                features: [
                                    'Unlimited 30-second spots',
                                    'Premium website placement',
                                    'Daily social media mentions',
                                    'Weekly newsletter feature',
                                    'Exclusive event sponsorship',
                                    'Custom branded content',
                                    'Dedicated account manager'
                                ]
                            }
                        ].map((pkg, idx) => (
                            <div
                                key={idx}
                                className={`relative bg-neutral-900 border-2 rounded-2xl p-8 ${pkg.popular ? 'border-brand-lemon scale-105' : 'border-white/10'
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lemon text-brand-gray px-4 py-1 rounded-full text-xs font-bold uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-black text-white uppercase mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-black text-white">{pkg.price}</span>
                                    <span className="text-neutral-500">{pkg.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start gap-2 text-neutral-300 text-sm">
                                            <span className="text-brand-lemon mt-1">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={pkg.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                    onClick={() => setFormData({ ...formData, package: pkg.name })}
                                >
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="max-w-3xl mx-auto">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-black text-white uppercase mb-6">Get In Touch</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Company</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
                                        placeholder="Company name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors"
                                        placeholder="+27 10 123 4567"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Package Interest</label>
                                <select
                                    value={formData.package}
                                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                    className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-lemon transition-colors"
                                >
                                    <option value="">Select a package</option>
                                    <option value="Bronze">Bronze - R5,000/month</option>
                                    <option value="Silver">Silver - R10,000/month</option>
                                    <option value="Gold">Gold - R20,000/month</option>
                                    <option value="Custom">Custom Package</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-400 uppercase mb-2">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-lemon transition-colors resize-none"
                                    placeholder="Tell us about your advertising goals..."
                                />
                            </div>

                            <Button type="submit" size="lg" className="w-full">
                                Send Inquiry
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="text-white font-bold mb-4">Or contact us directly:</h3>
                            <div className="space-y-3 text-neutral-300">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-brand-lemon" />
                                    <a href="mailto:advertising@newtownradio.co.za" className="hover:text-brand-lemon transition-colors">
                                        advertising@newtownradio.co.za
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-brand-lemon" />
                                    <a href="tel:+27101234567" className="hover:text-brand-lemon transition-colors">
                                        +27 10 123 4567
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
