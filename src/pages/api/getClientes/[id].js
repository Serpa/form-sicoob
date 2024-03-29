import dayjs from 'dayjs'
import prisma from '../../../../lib/prisma'

export const config = {
    api: {
        responseLimit: false,
    },
}

export default async function GetClientes(req, res) {
    const { id } = req.query
    if (id === "undefined") res.status(200).json(null)
    const result = await prisma.clientes.findMany({
        where: {
            assembleiaId: id
        },
        include: {
            Administradores: true,
            User: true
        }
    })
    const clientes = result.map((cliente) => {
        cliente.dataNascimento = dayjs(cliente.dataNascimento).format("DD/MM/YYYY")
        return cliente
    })
    res.status(200).json(clientes)
}