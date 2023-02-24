import prisma from '../../../../lib/prisma'

export default async function GetClientes(req, res) {
    const { id } = req.query
    const result = await prisma.clientes.findMany({
        where: {
            assembleiaId: id
        }
    })
    res.status(200).json(result)
}