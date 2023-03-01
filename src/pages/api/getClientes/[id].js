import prisma from '../../../../lib/prisma'

export default async function GetClientes(req, res) {
    const { id } = req.query
    if (id === "undefined") res.status(200).json(null)
    const result = await prisma.clientes.findMany({
        where: {
            assembleiaId: id
        },
        include: {
            Administradores: true
        }
    })
    res.status(200).json(result)
}