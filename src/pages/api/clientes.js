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
        const assembleiaCreate = await prisma.Assembleia.create({
            data: req.body.assembleia,
        })
        const clientes = req.body.clientes.map((cliente) => {
            return {
                nomeCliente: cliente.nomeCliente,
                nomeGerente: cliente.nomeGerente,
                idade: parseInt(cliente.idade),
                numeroCPF_CNPJ: cliente.numeroCPF_CNPJ,
                numeroPA: parseInt(cliente.numeroPA),
                assembleiaId: assembleiaCreate.id,
            }

        })
        const clientesCreate = await prisma.clientes.createMany({
            data: clientes
        })

        const clientesFind = await prisma.clientes.findMany({
            where: {
                assembleiaId: assembleiaCreate.id
            }
        })

        const adms = req.body.adms.map((adm) => {
            let cliente = clientesFind.filter((cliente) => cliente.numeroCPF_CNPJ === adm.numeroCPF_CNPJ || cliente.nomeCliente === adm.nomeCliente)
            delete adm.numeroCPF_CNPJ
            delete adm.nomeCliente
            return {
                ...adm,
                clienteId: cliente[0]?.id
            }
        })
        const administradoresCreate = await prisma.Administradores.createMany({
            data: adms
        })
        res.json(administradoresCreate)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}