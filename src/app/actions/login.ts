"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData: FormData) {
    try {
        // Check user role to determine redirect
        const email = formData.get("email") as string;

        if (email) {
            // We need to import prisma here since it's a server action
            const { prisma } = await import("@/lib/prisma");
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (user) {
                let redirectPath = "/dashboard";
                if (user.role === "SUPER_ADMIN") {
                    redirectPath = "/super-admin";
                } else if (user.role === "ADMIN") {
                    redirectPath = "/admin";
                }

                // Override the redirectTo field
                formData.set("redirectTo", redirectPath);
            }
        }

        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
