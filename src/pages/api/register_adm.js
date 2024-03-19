
import prisma from '../../../lib/prisma'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function RegisterAdm(req, res) {
    let { clienteId, desc, nomeAdm } = req.body
    const createAdm = await prisma.Administradores.create({
        data: {
            nomeAdm: nomeAdm,
            descricao: desc,
            clienteId: clienteId
        }
    })
    return res.json(createAdm)
}