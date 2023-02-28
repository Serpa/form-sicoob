
import prisma from '../../../lib/prisma'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function Register(req, res) {
    let { numeroPA, nomeCliente, numeroCPF_CNPJ, idade, nomeGerente, foto, presente, hora, assembleiaId, nomeAdm, descricao } = req.body
    numeroPA = parseInt(numeroPA)
    idade = parseInt(idade)
    const result = await prisma.clientes.create({
        data: {
            numeroPA, nomeCliente, numeroCPF_CNPJ, nomeGerente, foto, presente, hora, idade, assembleiaId, nomeAdm
        }
    })
    if (nomeAdm) {
        const createAdm = await prisma.Administradores.create({
            data: {
                nomeAdm: nomeAdm,
                descricao: descricao,
                clienteId: result.id
            }
        })
        console.log(createAdm);
    }
    console.log(result);
    res.json(result)
}