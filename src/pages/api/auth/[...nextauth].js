import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../lib/prisma"
const bcrypt = require('bcrypt');

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const dbUser = await prisma.User.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (dbUser) {
                    if (await bcrypt.compare(credentials.password, dbUser.password)) {
                        delete dbUser.password
                        return dbUser
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            // console.log('JWT Callback', { token })
            if (user) {
                const u = user
                return {
                    ...token,
                    ...user
                }
            }
            return token
        },
        session: ({ session, token }) => {
            // console.log('Session Callback', { token })
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        },
    }
}

export default NextAuth(authOptions)