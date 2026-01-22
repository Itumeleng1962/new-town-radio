"use client";

import { useLanguage } from '@/lib/context/LanguageContext';
import { ProductItem } from '@/components/shop/ProductItem';
import { ShoppingBag } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    category: string | null;
}

interface ShopContentProps {
    products: Product[];
}

export default function ShopContent({ products }: ShopContentProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-neutral-900 text-white pt-24 px-4 pb-20">
            <div className="container mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-brand-lemon mb-4 uppercase tracking-tighter">
                        {t('shop.store')}
                    </h1>
                    <p className="text-neutral-400 max-w-xl mx-auto">
                        {t('shop.description')}
                    </p>
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-neutral-800 rounded-xl border border-white/10">
                        <ShoppingBag className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{t('shop.comingSoon')}</h3>
                        <p className="text-neutral-400">{t('shop.stockingShelves')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductItem
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image || '/shop/placeholder.jpg'}
                                category={product.category || 'Merch'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
