import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placement = searchParams.get('placement');

    if (!placement) {
      return NextResponse.json({ error: 'Placement required' }, { status: 400 });
    }

    const now = new Date();

    // Find active ad for this placement
    const ad = await prisma.advertisement.findFirst({
      where: {
        placement,
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

    if (!ad) {
      // Log for debugging
      console.log(`No active ad found for placement: ${placement} at ${now.toISOString()}`);
      return NextResponse.json(null);
    }

    // Verify ad has required media
    if (ad.type === 'image' && !ad.image) {
      console.log(`Ad ${ad.id} is image type but has no image`);
      return NextResponse.json(null);
    }
    if (ad.type === 'video' && !ad.videoUrl) {
      console.log(`Ad ${ad.id} is video type but has no videoUrl`);
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: ad.id,
      title: ad.title,
      type: ad.type,
      image: ad.image,
      videoUrl: ad.videoUrl,
      link: ad.link,
      placement: ad.placement,
      active: ad.active
    });
  } catch (error) {
    console.error('Error fetching ad:', error);
    return NextResponse.json({ error: 'Failed to fetch ad' }, { status: 500 });
  }
}
