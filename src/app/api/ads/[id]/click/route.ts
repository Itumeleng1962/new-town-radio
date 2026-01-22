import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.advertisement.update({
      where: { id },
      data: {
        clicks: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}
