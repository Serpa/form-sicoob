import prisma from '../../../../lib/prisma'

export default async function countPresence(req, res) {
    const { id } = req.query
    if (!id) res.status(200).json('teste')
    const result = await prisma.clientes.count({
        where: {
            assembleiaId: id,
            presente: true
        }
    })
    res.status(200).json(result)
}