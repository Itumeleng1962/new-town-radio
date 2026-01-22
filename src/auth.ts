import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                })

                if (!user || !user.password) return null

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isCorrectPassword) return null

                return user
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            if (token?.sub && session.user) {
                session.user.id = token.sub
                // Fetch role from DB if needed, or store in token
                const dbUser = await prisma.user.findUnique({ where: { id: token.sub } })
                session.user.role = dbUser?.role || "USER"
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login',
    }
})
