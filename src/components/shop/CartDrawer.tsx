"use client";

import { useCart } from '@/lib/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
    const { items, removeItem, updateQuantity, total, isCartOpen, closeCart } = useCart();
    const router = useRouter();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        closeCart();
        router.push('/checkout');
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-neutral-900 h-full shadow-2xl border-l border-white/10 flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-900">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-brand-lemon" />
                        <h2 className="text-xl font-black text-white uppercase">Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})</h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <ShoppingBag className="w-16 h-16 text-neutral-600" />
                            <p className="text-xl font-bold text-neutral-400">Your cart is empty</p>
                            <Button onClick={closeCart} variant="outline">Start Shopping</Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-neutral-800/50 p-4 rounded-xl border border-white/5">
                                <div className="relative w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-white truncate pr-2">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-neutral-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    {item.size && (
                                        <p className="text-xs text-brand-lemon font-bold uppercase mb-2">Size: {item.size}</p>
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-neutral-900 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-brand-lemon transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-brand-lemon transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-white">R{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-neutral-900">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-neutral-400 font-bold uppercase">Subtotal</span>
                            <span className="text-2xl font-black text-brand-lemon">R{total}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                        <Button
                            className="w-full bg-brand-lemon text-black hover:bg-white hover:text-black font-black uppercase tracking-wider py-6 text-lg"
                            onClick={handleCheckout}
                        >
                            Checkout <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
