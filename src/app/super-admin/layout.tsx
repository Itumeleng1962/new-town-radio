
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // Strict check for SUPER_ADMIN role
    if (session.user.role !== "SUPER_ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="font-black text-xl tracking-tighter text-red-500 uppercase">
                        Super Admin
                    </div>
                    <div className="text-sm text-neutral-400">
                        {session.user.email}
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
