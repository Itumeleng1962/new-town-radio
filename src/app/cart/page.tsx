"use client";

import { useCart } from '@/lib/context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="bg-neutral-800 p-8 rounded-full mb-6">
                    <ShoppingBag size={48} className="text-neutral-500" />
                </div>
                <h1 className="text-3xl font-black mb-2 uppercase">Your Cart is Empty</h1>
                <p className="text-neutral-400 mb-8 max-w-md">Looks like you haven't added any merch yet. Check out our store for the latest gear.</p>
                <Link href="/shop">
                    <Button size="lg">Browse Store</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white pt-24 px-4 pb-20">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-black mb-8 border-b border-white/10 pb-4 uppercase">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 md:gap-6 bg-neutral-800/50 border border-white/5 rounded-xl p-4 md:p-6">
                                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-neutral-700 rounded-lg overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                            <p className="text-sm text-neutral-400 mb-2">{item.size || 'Standard Size'}</p>
                                            <div className="text-brand-lemon font-bold">R{item.price.toFixed(2)}</div>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-neutral-500 hover:text-red-500 transition-colors p-2">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="flex items-center bg-neutral-900 rounded-lg border border-white/10">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-white/10 transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-white/10 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <button onClick={clearCart} className="text-red-500 text-sm hover:underline">Clear Cart</button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 sticky top-28">
                            <h3 className="text-xl font-bold uppercase mb-6">Order Summary</h3>

                            <div className="space-y-3 mb-6 border-b border-white/10 pb-6 text-sm">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span>R{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8 text-xl font-black">
                                <span>Total</span>
                                <span className="text-brand-lemon">R{total.toFixed(2)}</span>
                            </div>

                            <Button className="w-full flex items-center justify-center gap-2 py-6 text-base" onClick={() => alert("Checkout Feature Coming Soon!")}>
                                Checkout <ArrowRight size={18} />
                            </Button>

                            <p className="text-center text-xs text-neutral-500 mt-4">
                                Secure Checkout powered by PayFast (Mock)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
