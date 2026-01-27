"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Missing fields" };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const role = email === 'projects@guardian-angelstudios.co.za' ? 'SUPER_ADMIN' : 'USER';

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        },
    });

    // Auto login? or redirect to login.
    // We can try to sign them in immediately, but Redirect is easier for now.
    return { success: true };
}
