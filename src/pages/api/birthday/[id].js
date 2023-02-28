import prisma from '../../../../lib/prisma'

export default async function Birthday(req, res) {
    const { id } = req.query
    if (id === "undefined") res.status(200).json(null)
    const result = await prisma.clientes.aggregateRaw({
        pipeline: [
            {
                $match: {
                    presente: true, assembleiaId: { $oid: id },
                    $expr: {
                        $eq: [
                            { $week: "$dataNascimento" },
                            { $week: { '$date': new Date() } },
                        ],
                    },
                },
            }
        ],
    })
    console.log(result);
    res.status(200).json(result)
}