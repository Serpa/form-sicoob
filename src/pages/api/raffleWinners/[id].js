import prisma from '../../../../lib/prisma'


export default async function raffleWinners(req, res) {
    const { id } = req.query
    const result = await prisma.clientes.findMany({
        where: {
            assembleiaId: id,
            sorteado: true,
        },
        orderBy:
        {
            dataSorteio: 'asc',
        },
    })
    res.status(200).json(result)
}