import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Debug endpoint to see all ads and their status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placement = searchParams.get('placement');

    const now = new Date();

    // Get all ads (for debugging)
    const allAds = await prisma.advertisement.findMany({
      where: placement ? { placement } : undefined,
      orderBy: {
        position: 'asc'
      }
    });

    // Get active ads
    const activeAds = await prisma.advertisement.findMany({
      where: {
        ...(placement ? { placement } : {}),
        active: true,
        AND: [
          {
            OR: [
              { startDate: null },
              { startDate: { lte: now } }
            ]
          },
          {
            OR: [
              { endDate: null },
              { endDate: { gte: now } }
            ]
          }
        ]
      },
      orderBy: {
        position: 'asc'
      }
    });

    return NextResponse.json({
      now: now.toISOString(),
      placement: placement || 'all',
      totalAds: allAds.length,
      activeAds: activeAds.length,
      allAds: allAds.map(ad => ({
        id: ad.id,
        title: ad.title,
        type: ad.type,
        placement: ad.placement,
        active: ad.active,
        hasImage: !!ad.image,
        hasVideo: !!ad.videoUrl,
        startDate: ad.startDate?.toISOString() || null,
        endDate: ad.endDate?.toISOString() || null,
        position: ad.position,
        isInDateRange: (!ad.startDate || new Date(ad.startDate) <= now) && (!ad.endDate || new Date(ad.endDate) >= now)
      })),
      activeAdsList: activeAds.map(ad => ({
        id: ad.id,
        title: ad.title,
        type: ad.type,
        placement: ad.placement
      }))
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({ error: 'Failed to fetch debug info', details: String(error) }, { status: 500 });
  }
}
