
import prisma from '../../../lib/prisma'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function PresenceAPI(req, res) {
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
        },
    })
    return res.json(result)
}