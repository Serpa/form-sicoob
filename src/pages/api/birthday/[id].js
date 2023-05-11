import dayjs from 'dayjs'
import prisma from '../../../../lib/prisma'

export default async function Birthday(req, res) {
    const { id } = req.query
    if (!id) res.status(200).json('teste')
    const result = await prisma.clientes.aggregateRaw({
        pipeline: [
            {
                $project: {
                    nomeCliente: 1,
                    nomeGerente: 1,
                    numeroCPF_CNPJ: 1,
                    numeroPA: 1,
                    foto: 1,
                    hora: 1,
                    dataNascimento: true,
                    presente: 1,
                    assembleiaId: 1,
                    birthDate: {
                        $dateFromParts: {
                            year: { $year: { '$date': new Date() } },
                            month: { $month: "$dataNascimento" },
                            day: { $dayOfMonth: "$dataNascimento" },
                        },
                    },
                },
            },
            { $sort: { nomeCliente: 1 } },
            {
                $match: {
                    presente: true, assembleiaId: { $oid: id },
                    $expr: {
                        $eq: [
                            { $week: "$birthDate" },
                            { $week: { '$date': new Date() } },
                        ],
                    },
                },
            }
        ],
    })
    const clientes = result.map((cliente) => {
        if (cliente.dataNascimento.$date.$numberLong) {
            cliente.dataNascimento.$date = dayjs(parseInt(cliente.dataNascimento.$date.$numberLong)).format("DD/MM/YYYY")
            return cliente
        } else {
            cliente.dataNascimento.$date = dayjs(cliente.dataNascimento.$date).format("DD/MM/YYYY")
            return cliente
        }
    })
    res.status(200).json(clientes)
}