import { Button } from '@/components/ui/Button';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        name: "Free",
        price: 0,
        icon: Star,
        features: [
            "Live stream access",
            "Weekly newsletter",
            "Community forum access",
            "Event notifications"
        ],
        cta: "Sign Up Free",
        popular: false
    },
    {
        name: "Supporter",
        price: 50,
        icon: Zap,
        features: [
            "Everything in Free",
            "Ad-free streaming",
            "Early event access",
            "Exclusive podcast episodes",
            "Monthly digital mixtapes",
            "Supporter badge"
        ],
        cta: "Become a Supporter",
        popular: true
    },
    {
        name: "VIP",
        price: 150,
        icon: Crown,
        features: [
            "Everything in Supporter",
            "VIP event access",
            "Meet & greets with hosts",
            "Exclusive merch discounts (20%)",
            "Behind-the-scenes content",
            "Priority support",
            "Annual VIP party invite"
        ],
        cta: "Go VIP",
        popular: false
    }
];

export default function MembershipPage() {
    return (
        <div className="pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-b from-neutral-900 to-brand-gray py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6">
                        Support <span className="text-brand-lemon">Independent Radio</span>
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                        Join our community of supporters and help keep Newtown Radio on air. Get exclusive perks, ad-free listening, and access to members-only content.
                    </p>
                </div>
            </div>

            {/* Pricing Tiers */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`relative bg-neutral-900 border-2 rounded-2xl p-8 ${tier.popular
                                        ? 'border-brand-lemon scale-105 shadow-2xl shadow-brand-lemon/20'
                                        : 'border-white/10'
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lemon text-brand-gray px-4 py-1 rounded-full text-xs font-bold uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <Icon className={`w-12 h-12 mx-auto mb-4 ${tier.popular ? 'text-brand-lemon' : 'text-neutral-600'}`} />
                                    <h3 className="text-2xl font-black text-white uppercase mb-2">{tier.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-black text-white">R{tier.price}</span>
                                        {tier.price > 0 && <span className="text-neutral-500">/month</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-brand-lemon shrink-0 mt-0.5" />
                                            <span className="text-neutral-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={tier.popular ? "primary" : "outline"}
                                    className="w-full"
                                >
                                    {tier.cta}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FAQ / Additional Info */}
            <div className="bg-neutral-900 py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl font-black text-white uppercase mb-12 text-center">
                        Why <span className="text-brand-lemon">Become a Member?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-brand-gray border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">Support Independent Media</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Your membership directly funds our operations, pays our hosts, and keeps us ad-free and independent.
                            </p>
                        </div>

                        <div className="bg-brand-gray border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">Exclusive Content</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Get access to extended interviews, behind-the-scenes content, and members-only podcast episodes.
                            </p>
                        </div>

                        <div className="bg-brand-gray border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">Community Access</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Join our private community forum, attend exclusive events, and connect with like-minded listeners.
                            </p>
                        </div>

                        <div className="bg-brand-gray border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">Cancel Anytime</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                No long-term commitment. Cancel your membership at any time, no questions asked.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-neutral-400 mb-6">Prefer to make a one-time contribution?</p>
                        <Link href="/donate">
                            <Button variant="outline">Make a Donation</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
