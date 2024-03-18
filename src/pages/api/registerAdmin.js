import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "lib/prisma";
const bcrypt = require('bcrypt');

export default async function POST(req, res) {
    const newUser = await req.body;
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.json('Não autorizado!', { status: 401 })
    }
    try {
        const passwordHash = await bcrypt.hash(newUser.password, 10)
        const user = await prisma.User.create({
            data: {
                name: newUser.name,
                email: newUser.email,
                password: passwordHash
            }
        });
        delete user.password
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}