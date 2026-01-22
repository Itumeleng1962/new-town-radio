import { prisma } from '@/lib/prisma';
import ShopContent from './ShopContent';

export const revalidate = 0;

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { name: 'asc' }
    });

    return <ShopContent products={products} />;
}
