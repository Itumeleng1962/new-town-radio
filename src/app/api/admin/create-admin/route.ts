import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * API endpoint to create the first admin user
 * 
 * SECURITY NOTE: This should be disabled or protected after creating the first admin!
 * 
 * Usage: POST /api/admin/create-admin
 * Body: { email, password, name }
 */
export async function POST(request: NextRequest) {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'An admin user already exists. Use the script instead or update via database.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update to admin
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
          name: name || existingUser.name
        }
      });
      return NextResponse.json({ 
        success: true, 
        message: 'User updated to ADMIN role',
        email 
      });
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || 'Admin User',
          role: 'ADMIN'
        }
      });
      return NextResponse.json({ 
        success: true, 
        message: 'Admin user created successfully',
        email 
      });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
