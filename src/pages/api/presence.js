
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma'
import { authOptions } from "../api/auth/[...nextauth]";
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function PresenceAPI(req, res) {
    const session = await getServerSession(req, res, authOptions);
    console.log(session)
    const user = await req.body
    const result = await prisma.clientes.update({
        where: {
            id: user.id
        },
        data: {
            presente: true,
            hora: new Date(),
            foto: user.foto,
            nomeAdm: user.nomeAdm,
            userId: session.user.id
        },
    })
    return res.json(result)
}