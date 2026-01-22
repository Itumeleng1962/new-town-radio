import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PersistentPlayer } from "@/components/player/PersistentPlayer";
import { CartProvider } from "@/lib/context/CartContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Newtown Radio | Sound of the City",
  description: "Live 24/7 underground culture, music, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-brand-gray text-white" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-grow pt-32">
                {children}
              </main>
              <Footer />
              <PersistentPlayer />
              <Toaster theme="dark" position="top-center" richColors />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
