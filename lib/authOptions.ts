import prisma from './prisma'
import { compare } from 'bcrypt'
import NextAuth, { DefaultSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    //     interface Session {
    //         user: {
    //             cargo: {
    //                 id: number;
    //                 nome: string;
    //                 descricao: string;
    //                 permFrutal: permFrutal[];
    //                 permUberlandia: permUberlandia[];
    //                 permUniodonto: permUniodonto[];
    //             },
    //             id: number;
    //         } & DefaultSession["user"]
    //     }
}

export const authOptions: NextAuthOptions = {
   
}