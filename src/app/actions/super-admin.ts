
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- MIDDLEWARE / CHECK ---
async function checkSuperAdmin() {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized: Super Admin access required.");
    }
    return session.user;
}

// --- USER MANAGEMENT ---

export async function getAllUsers() {
    await checkSuperAdmin();
    // In a real app, implement pagination. Limit to 100 for now.
    return await prisma.user.findMany({
        take: 100,
        orderBy: { createdAt: "desc" },
    });
}

export async function updateUserRole(userId: string, newRole: string) {
    const admin = await checkSuperAdmin();

    // Prevent self-demotion if not careful, but allowing it for flexibility
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
    });

    // Log the action
    await prisma.auditLog.create({
        data: {
            action: "USER_ROLE_UPDATE",
            details: `Updated user ${updatedUser.email} role to ${newRole}`,
            userId: admin.id!,
        },
    });

    revalidatePath("/super-admin");
    return { success: true };
}

// --- AUDIT LOGS ---

export async function getAuditLogs() {
    await checkSuperAdmin();
    return await prisma.auditLog.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
    });
}

// --- SYSTEM SETTINGS ---

export async function getSystemSettings() {
    await checkSuperAdmin();
    return await prisma.systemSetting.findMany();
}

export async function updateSystemSetting(key: string, value: string) {
    const admin = await checkSuperAdmin();

    await prisma.systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
    });

    await prisma.auditLog.create({
        data: {
            action: "SYSTEM_SETTING_UPDATE",
            details: `Updated setting ${key} to ${value}`,
            userId: admin.id!,
        },
    });

    revalidatePath("/super-admin");
    return { success: true };
}

// --- STATS ---
export async function getSuperAdminStats() {
    await checkSuperAdmin();
    const [userCount, showCount, eventCount, productCount, adCount] = await Promise.all([
        prisma.user.count(),
        prisma.show.count(),
        prisma.event.count(),
        prisma.product.count(),
        prisma.advertisement.count(),
    ]);

    return { userCount, showCount, eventCount, productCount, adCount };
}

// --- FINANCIAL MANAGEMENT ---

export async function getFinancialStats() {
    await checkSuperAdmin();

    // Calculate total revenue from orders
    const orders = await prisma.order.findMany({
        where: { status: "COMPLETED" },
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Get current month revenue
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyOrders = await prisma.order.findMany({
        where: {
            status: "COMPLETED",
            createdAt: { gte: firstDayOfMonth },
        },
    });
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    // Order statistics
    const [totalOrders, pendingOrders, completedOrders] = await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.order.count({ where: { status: "COMPLETED" } }),
    ]);

    return {
        totalRevenue,
        monthlyRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        averageOrderValue: totalOrders > 0 ? totalRevenue / completedOrders : 0,
    };
}

export async function getRecentOrders() {
    await checkSuperAdmin();
    return await prisma.order.findMany({
        take: 20,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, email: true } },
            items: {
                include: {
                    product: { select: { name: true } },
                },
            },
        },
    });
}

export async function getTopProducts() {
    await checkSuperAdmin();

    // Get all order items with product info
    const orderItems = await prisma.orderItem.findMany({
        include: {
            product: true,
            order: { select: { status: true } },
        },
    });

    // Filter completed orders and aggregate by product
    const productStats = orderItems
        .filter(item => item.order.status === "COMPLETED")
        .reduce((acc, item) => {
            const productId = item.productId;
            if (!acc[productId]) {
                acc[productId] = {
                    id: productId,
                    name: item.product.name,
                    unitsSold: 0,
                    revenue: 0,
                };
            }
            acc[productId].unitsSold += item.quantity;
            acc[productId].revenue += item.price * item.quantity;
            return acc;
        }, {} as Record<string, any>);

    // Convert to array and sort by revenue
    return Object.values(productStats)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 10);
}

export async function getRevenueByCategory() {
    await checkSuperAdmin();

    const orderItems = await prisma.orderItem.findMany({
        include: {
            product: { select: { category: true } },
            order: { select: { status: true } },
        },
    });

    const categoryRevenue = orderItems
        .filter(item => item.order.status === "COMPLETED")
        .reduce((acc, item) => {
            const category = item.product.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += item.price * item.quantity;
            return acc;
        }, {} as Record<string, number>);

    return Object.entries(categoryRevenue).map(([category, revenue]) => ({
        category,
        revenue,
    }));
}

// --- CONTENT ANALYTICS ---

export async function getContentAnalytics() {
    await checkSuperAdmin();

    const [
        totalShows,
        totalEpisodes,
        featuredShows,
        totalEvents,
        upcomingEvents,
        totalAds,
        activeAds,
    ] = await Promise.all([
        prisma.show.count(),
        prisma.episode.count(),
        prisma.show.count({ where: { featured: true } }),
        prisma.event.count(),
        prisma.event.count({ where: { date: { gte: new Date() } } }),
        prisma.advertisement.count(),
        prisma.advertisement.count({ where: { active: true } }),
    ]);

    return {
        totalShows,
        totalEpisodes,
        featuredShows,
        totalEvents,
        upcomingEvents,
        totalAds,
        activeAds,
    };
}

export async function getAdPerformance() {
    await checkSuperAdmin();

    const ads = await prisma.advertisement.findMany({
        orderBy: { clicks: "desc" },
        take: 20,
    });

    return ads.map(ad => ({
        id: ad.id,
        title: ad.title,
        clicks: ad.clicks,
        impressions: ad.impressions,
        ctr: ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : "0.00",
        active: ad.active,
    }));
}

export async function getShowsByHost() {
    await checkSuperAdmin();

    const shows = await prisma.show.findMany({
        include: {
            host: { select: { name: true, email: true } },
            _count: { select: { episodes: true } },
        },
    });

    const hostStats = shows.reduce((acc, show) => {
        const hostId = show.hostId;
        if (!acc[hostId]) {
            acc[hostId] = {
                hostName: show.host.name || show.host.email || "Unknown",
                showCount: 0,
                episodeCount: 0,
            };
        }
        acc[hostId].showCount += 1;
        acc[hostId].episodeCount += show._count.episodes;
        return acc;
    }, {} as Record<string, any>);

    return Object.values(hostStats);
}

// --- DATA EXPORT ---

export async function exportData(type: string) {
    await checkSuperAdmin();

    let data: any[] = [];

    switch (type) {
        case "users":
            data = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });
            break;
        case "orders":
            data = await prisma.order.findMany({
                include: {
                    user: { select: { email: true } },
                    items: {
                        include: {
                            product: { select: { name: true } },
                        },
                    },
                },
            });
            break;
        case "products":
            data = await prisma.product.findMany();
            break;
        case "shows":
            data = await prisma.show.findMany({
                include: {
                    host: { select: { name: true, email: true } },
                    _count: { select: { episodes: true } },
                },
            });
            break;
        case "events":
            data = await prisma.event.findMany();
            break;
        case "auditLogs":
            data = await prisma.auditLog.findMany({
                include: {
                    user: { select: { email: true } },
                },
            });
            break;
        default:
            throw new Error("Invalid export type");
    }

    return data;
}

// --- CONTENT MODERATION ---

export async function bulkDeleteContent(type: string, ids: string[]) {
    const admin = await checkSuperAdmin();

    let deletedCount = 0;

    switch (type) {
        case "shows":
            const result = await prisma.show.deleteMany({
                where: { id: { in: ids } },
            });
            deletedCount = result.count;
            break;
        case "events":
            const eventResult = await prisma.event.deleteMany({
                where: { id: { in: ids } },
            });
            deletedCount = eventResult.count;
            break;
        case "products":
            const productResult = await prisma.product.deleteMany({
                where: { id: { in: ids } },
            });
            deletedCount = productResult.count;
            break;
        case "ads":
            const adResult = await prisma.advertisement.deleteMany({
                where: { id: { in: ids } },
            });
            deletedCount = adResult.count;
            break;
        default:
            throw new Error("Invalid content type");
    }

    // Log the bulk deletion
    await prisma.auditLog.create({
        data: {
            action: `BULK_DELETE_${type.toUpperCase()}`,
            details: `Deleted ${deletedCount} ${type}`,
            userId: admin.id!,
        },
    });

    revalidatePath("/super-admin");
    return { success: true, deletedCount };
}

export async function getLowStockProducts() {
    await checkSuperAdmin();
    return await prisma.product.findMany({
        where: { stock: { lt: 5 } },
        orderBy: { stock: "asc" },
    });
}
