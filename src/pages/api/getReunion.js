import prisma from '../../../lib/prisma'

export default async function getReunion(req, res) {
    const result = await prisma.Assembleia.findMany()
    res.status(200).json(result)
}