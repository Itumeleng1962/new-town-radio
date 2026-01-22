"use client";

import { useCart } from '@/lib/context/CartContext';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
    const [loading, setLoading] = useState(false);

    if (items.length === 0 && step !== 'confirmation') {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-black text-white uppercase mb-4">Your cart is empty</h1>
                <Link href="/shop">
                    <Button variant="primary">Return to Shop</Button>
                </Link>
            </div>
        );
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('confirmation');
            clearCart();
        }, 2000);
    };

    if (step === 'confirmation') {
        return (
            <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
                <div className="bg-neutral-900 border border-white/10 rounded-2xl p-12">
                    <div className="w-20 h-20 bg-brand-lemon rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-brand-gray" />
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase mb-4">Order Confirmed!</h1>
                    <p className="text-neutral-400 text-lg mb-8">
                        Thank you for your purchase. You will receive an email confirmation shortly.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/shop">
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="primary">Back Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <Link href="/shop" className="inline-flex items-center text-neutral-400 hover:text-white mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Forms */}
                <div>
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'shipping' ? 'bg-brand-lemon text-black' : 'bg-neutral-800 text-white'
                                }`}>1</div>
                            <div className="h-px bg-white/10 flex-1" />
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 'payment' ? 'bg-brand-lemon text-black' : 'bg-neutral-800 text-white'
                                }`}>2</div>
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase mb-2">
                            {step === 'shipping' ? 'Shipping Details' : 'Payment Method'}
                        </h1>
                    </div>

                    {step === 'shipping' ? (
                        <form onSubmit={handleShippingSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="First Name" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                <input required placeholder="Last Name" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            </div>
                            <input required type="email" placeholder="Email Address" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            <input required placeholder="Street Address" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="City" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                <input required placeholder="Postal Code" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                            </div>
                            <Button type="submit" className="w-full h-12 text-lg font-bold uppercase">
                                Continue to Payment <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                            <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 mb-6">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <CreditCard size={20} className="text-brand-lemon" /> Credit Card
                                </h3>
                                <div className="space-y-4">
                                    <input required placeholder="Card Number" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input required placeholder="MM / YY" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                        <input required placeholder="CVC" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                    </div>
                                    <input required placeholder="Cardholder Name" className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-lemon outline-none" />
                                </div>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-bold uppercase">
                                {loading ? 'Processing...' : `Pay R${total}`}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep('shipping')}
                                className="w-full text-center text-neutral-400 hover:text-white text-sm"
                            >
                                Back to Shipping
                            </button>
                        </form>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:pl-12">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 sticky top-24">
                        <h2 className="text-xl font-black text-white uppercase mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-neutral-800 rounded-md overflow-hidden shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-xs text-neutral-400">Qty: {item.quantity} {item.size && `• Size: ${item.size}`}</p>
                                        <p className="font-bold text-brand-lemon mt-1">R{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-neutral-400">
                                <span>Subtotal</span>
                                <span>R{total}</span>
                            </div>
                            <div className="flex justify-between text-neutral-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10 mt-2">
                                <span>Total</span>
                                <span>R{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
