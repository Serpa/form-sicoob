import dayjs from 'dayjs'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth'
import authOptions from './auth/[...nextauth]'

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function GET(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json('Não autorizado!')
    try {
        const result = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                id: true
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}