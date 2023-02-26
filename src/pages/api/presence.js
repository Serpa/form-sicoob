
import prisma from '../../../lib/prisma'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function PresenceAPI(req, res) {
    const result = await prisma.clientes.update({
        where: {
            id: req.body.id,
        },
        data: {
            presente: true,
            hora: new Date(),
            foto: req.body.foto,
            nomeAdm: req.body.nomeAdm,
        },
    })
    console.log(result);
    res.json(result)
}