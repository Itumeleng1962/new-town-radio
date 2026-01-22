"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { savePublicUpload } from "@/lib/uploads";

// --- Users ---
export async function getRecentUsers() {
    try {
        return await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        });
    } catch (error) {
        return [];
    }
}

// --- Shows ---
export async function getShows() {
    try {
        return await prisma.show.findMany({
            orderBy: { title: 'asc' },
            include: { host: true }
        });
    } catch (error) {
        return [];
    }
}

export async function createShow(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const day = formData.get("day") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const hostId = formData.get("hostId") as string;
    const coverImageUrl = (formData.get("coverImage") as string) || "";
    const coverImageFile = formData.get("coverImageFile") as File | null;
    const featured = formData.get("featured") === "on";

    if (!title || !description || !hostId || !day || !startTime || !endTime) return { error: "Missing fields" };

    const schedule = `${day} ${startTime} - ${endTime}`;

    try {
        const uploaded = coverImageFile ? await savePublicUpload(coverImageFile) : null;
        const coverImage = uploaded || coverImageUrl || null;
        await prisma.show.create({
            data: {
                title,
                description,
                schedule,
                hostId,
                coverImage,
                featured
            }
        });
        revalidatePath('/admin');
        revalidatePath('/shows'); // Revalidate public page too
        return { success: true };
    } catch (error) {
        return { error: "Failed to create show" };
    }
}

export async function deleteShow(id: string) {
    try {
        await prisma.show.delete({ where: { id } });
        revalidatePath('/admin');
        revalidatePath('/shows');
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete" };
    }
}

// --- Events ---
export async function getEvents() {
    try {
        return await prisma.event.findMany({ orderBy: { date: 'asc' } });
    } catch (e) { return [] }
}

export async function createEvent(formData: FormData) {
    const title = formData.get("title") as string;
    const dateStr = formData.get("date") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const ticketLink = formData.get("ticketLink") as string;
    const imageUrl = (formData.get("image") as string) || "";
    const imageFile = formData.get("imageFile") as File | null;

    if (!title || !dateStr || !location) return { error: "Missing fields" };

    try {
        const uploaded = imageFile ? await savePublicUpload(imageFile) : null;
        const image = uploaded || imageUrl || null;
        await prisma.event.create({
            data: {
                title,
                date: new Date(dateStr),
                location,
                description,
                ticketLink,
                image
            }
        });
        revalidatePath('/admin');
        revalidatePath('/events');
        return { success: true };
    } catch (e) {
        return { error: "Failed to create event" };
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({ where: { id } });
        revalidatePath('/admin');
        revalidatePath('/events');
        return { success: true };
    } catch (e) { return { error: "Failed" } }
}

// --- Products ---
export async function getProducts() {
    try {
        return await prisma.product.findMany({ orderBy: { name: 'asc' } });
    } catch (e) { return [] }
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageUrl = (formData.get("image") as string) || "";
    const imageFile = formData.get("imageFile") as File | null;

    if (!name || !priceStr) return { error: "Missing fields" };

    try {
        const uploaded = imageFile ? await savePublicUpload(imageFile) : null;
        const image = uploaded || imageUrl || "/placeholder.jpg";
        await prisma.product.create({
            data: {
                name,
                price: parseFloat(priceStr),
                category: category || "Apparel",
                description,
                image
            }
        });
        revalidatePath('/admin');
        revalidatePath('/shop');
        return { success: true };
    } catch (e) {
        return { error: "Failed to create product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin');
        revalidatePath('/shop');
        return { success: true };
    } catch (e) { return { error: "Failed" } }
}

// --- Episodes ---
export async function getEpisodes() {
    try {
        return await prisma.episode.findMany({
            orderBy: { releaseDate: 'desc' },
            include: { show: true }
        });
    } catch (e) { return [] }
}

export async function createEpisode(formData: FormData) {
    const title = formData.get("title") as string;
    const showId = formData.get("showId") as string;
    const duration = formData.get("duration") as string;
    const audioUrl = formData.get("audioUrl") as string; // URL to mp3
    const imageUrl = (formData.get("image") as string) || "";
    const imageFile = formData.get("imageFile") as File | null;

    if (!title || !showId) return { error: "Missing fields" };

    try {
        const uploaded = imageFile ? await savePublicUpload(imageFile) : null;
        const image = uploaded || imageUrl || null;
        await prisma.episode.create({
            data: {
                title,
                showId,
                duration: parseInt(duration) || 60, // Parse to Int
                audioUrl: audioUrl || "#",
                releaseDate: new Date(),
                image
            }
        });
        revalidatePath('/admin');
        revalidatePath('/listen');
        return { success: true };
    } catch (e) {
        return { error: "Failed to create episode" };
    }
}

export async function deleteEpisode(id: string) {
    try {
        await prisma.episode.delete({ where: { id } });
        revalidatePath('/admin');
        revalidatePath('/listen');
        return { success: true };
    } catch (e) { return { error: "Failed" } }
}

// --- Advertisements ---
export async function getAds() {
    try {
        return await prisma.advertisement.findMany({
            orderBy: [
                { placement: 'asc' },
                { position: 'asc' }
            ]
        });
    } catch (e) {
        return [];
    }
}

export async function createAd(formData: FormData) {
    const title = formData.get("title") as string;
    const adType = formData.get("adType") as string || "image";
    const placement = formData.get("placement") as string;
    const link = formData.get("link") as string;
    const positionStr = formData.get("position") as string;
    const startDateStr = formData.get("startDate") as string;
    const endDateStr = formData.get("endDate") as string;
    const active = formData.get("active") === "on";
    const imageFile = formData.get("imageFile") as File | null;
    const videoFile = formData.get("videoFile") as File | null;

    if (!title || !placement) return { error: "Missing required fields" };

    let imagePath = null;
    let videoPath = null;

    if (adType === "video") {
        if (videoFile && videoFile.size > 0) {
            videoPath = await savePublicUpload(videoFile);
        } else {
            return { error: "Video file is required for video ads" };
        }
    } else {
        if (imageFile && imageFile.size > 0) {
            imagePath = await savePublicUpload(imageFile);
        } else {
            return { error: "Image is required for image ads" };
        }
    }

    try {
        await prisma.advertisement.create({
            data: {
                title,
                type: adType,
                image: imagePath,
                videoUrl: videoPath,
                link: link || null,
                placement,
                position: parseInt(positionStr) || 0,
                active,
                startDate: startDateStr ? new Date(startDateStr) : null,
                endDate: endDateStr ? new Date(endDateStr) : null
            }
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        return { error: "Failed to create ad" };
    }
}

export async function deleteAd(id: string) {
    try {
        await prisma.advertisement.delete({ where: { id } });
        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        return { error: "Failed to delete ad" };
    }
}

export async function toggleAdStatus(id: string, active: boolean) {
    try {
        await prisma.advertisement.update({
            where: { id },
            data: { active }
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (e) {
        return { error: "Failed to update ad" };
    }
}

// --- Stats ---
export async function getSystemStats() {
    const userCount = await prisma.user.count();
    const showCount = await prisma.show.count();
    const eventCount = await prisma.event.count();
    const productCount = await prisma.product.count();
    
    // Safely get ad count - handle case where model doesn't exist yet
    let adCount = 0;
    try {
        adCount = await prisma.advertisement.count();
    } catch (error) {
        // Model doesn't exist yet - will be 0 until migration is run
        console.log('Advertisement model not available yet - run prisma generate');
    }
    
    return { userCount, showCount, eventCount, productCount, adCount };
}
