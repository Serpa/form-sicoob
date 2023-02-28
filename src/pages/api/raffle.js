import prisma from '../../../lib/prisma'

export default async function Raffle(req, res) {
    const result = await prisma.clientes.aggregateRaw({
        pipeline: [
            { $match: { presente: true, assembleiaId: { $oid: req.body.assembleiaId } } },
            { $sample: { size: 1 } }
        ],
    })
    console.log(result);
    res.status(200).json(result)
}