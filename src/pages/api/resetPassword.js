import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth'
import authOptions from './auth/[...nextauth]'
const bcrypt = require('bcrypt');

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function PUT(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json('Não autorizado!')
    try {
        const info = await req.body;
        console.log(info)
        const passwordHash = await bcrypt.hash(info.password, 10)
        const result = await prisma.user.update({
            where: {
                id: info.id
            },
            data: {
                password: passwordHash
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}