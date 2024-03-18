import prisma from '../../../lib/prisma'

export default async function Raffle(req, res) {
    if (req.body.associado) {
        const result = await prisma.clientes.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        presente: true, sorteado: {
                            $in: [false, null]
                        }, assembleiaId: { $oid: req.body.assembleiaId }, associado: true
                    }
                },
                { $sample: { size: 1 } }
            ],
        })
        if (result.length) {
            const updateRaffle = await prisma.clientes.update({
                where: {
                    id: result[0]._id.$oid,
                },
                data: {
                    sorteado: true,
                    dataSorteio: new Date()
                },
            })
        }
        return res.status(200).json(result)
    } else {
        const result = await prisma.clientes.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        presente: true, sorteado: {
                            $in: [false, null]
                        }, assembleiaId: { $oid: req.body.assembleiaId }
                    }
                },
                { $sample: { size: 1 } }
            ],
        })
        if (result.length) {
            const updateRaffle = await prisma.clientes.update({
                where: {
                    id: result[0]._id.$oid,
                },
                data: {
                    sorteado: true,
                    dataSorteio: new Date()
                },
            })
        }
        return res.status(200).json(result)
    }
}