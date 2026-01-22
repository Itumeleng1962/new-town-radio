"use client";

import { useCart } from '@/lib/context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ProductItemProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductItem({ id, name, price, image, category }: ProductItemProps) {
    const { addItem } = useCart();
    const { t } = useLanguage();

    const handleAddToCart = () => {
        addItem({ id, name, price, image });
        toast.success(`${name} ${t('shop.addedToCart')}`);
    };

    return (
        <div className="group bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-brand-lemon/50 transition-all flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-neutral-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {category}
                    </span>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button onClick={handleAddToCart} size="lg" className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ShoppingBag className="mr-2" /> {t('shop.addToCart')}
                    </Button>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-lemon transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <span className="text-lg font-black text-brand-lemon shrink-0 ml-2">R{price}</span>
                </div>
                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
                    {t('shop.itemDescription').replace('{category}', category ? category.toLowerCase() : 'merch')}
                </p>

                <div className="mt-auto">
                    <Button onClick={handleAddToCart} variant="outline" className="w-full">
                        {t('shop.addToCart')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
