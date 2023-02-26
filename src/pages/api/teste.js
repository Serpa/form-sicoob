import prisma from '../../../lib/prisma'

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function Teste(req, res) {
    const result = await prisma.Clientes.findMany({
        where: {
            assembleiaId: '63f97c1f5c1820dacb89658f'
        },
        include: {
            Administradores: true
        }
    })
    res.status(200).json(result)
}