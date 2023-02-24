import prisma from '../../../lib/prisma'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}

export default async function ClientesAPI(req, res) {
    try {
        const result1 = await prisma.Assembleia.create({
            data: req.body.assembleia,
        })
        const data = req.body.clientes.map((cliente) => {
            return {
                nomeCliente: cliente.nomeCliente,
                nomeGerente: cliente.nomeGerente,
                idade: parseInt(cliente.idade),
                numeroCPF_CNPJ: cliente.numeroCPF_CNPJ,
                numeroPA: parseInt(cliente.numeroPA),
                assembleiaId: result1.id,
            }
        })
        console.log(data);
        const result2 = await prisma.clientes.createMany({
            data: data
        })
        console.log(result1);
        console.log(result2);
        res.json(result2)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}