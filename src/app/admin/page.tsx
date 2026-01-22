import { getRecentUsers, getShows, getSystemStats, getEvents, getProducts, getEpisodes, getAds } from '@/app/actions/admin';
import AdminDashboardClient from './client';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const users = await getRecentUsers() || [];
    const shows = await getShows() || [];
    const stats = await getSystemStats();
    const events = await getEvents() || [];
    const products = await getProducts() || [];
    const episodes = await getEpisodes() || [];
    const ads = await getAds() || [];

    // Ensure stats structure exists even if empty
    const safeStats = {
        userCount: stats?.userCount || 0,
        showCount: stats?.showCount || 0,
        eventCount: stats?.eventCount || 0,
        productCount: stats?.productCount || 0,
        adCount: stats?.adCount || 0,
    };

    return (
        <AdminDashboardClient
            users={users}
            shows={shows}
            stats={safeStats}
            events={events}
            products={products}
            episodes={episodes}
            ads={ads}
        />
    );
}
