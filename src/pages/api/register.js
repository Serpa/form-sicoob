
import prisma from '../../../lib/prisma'
import dayjs, { Dayjs } from "dayjs";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default async function Register(req, res) {
    let { numeroPA, nomeCliente, numeroCPF_CNPJ, dataNascimento, nomeGerente, foto, presente, hora, assembleiaId, nomeAdm, descricao, contato } = req.body
    if (numeroPA) {
        numeroPA = parseInt(numeroPA)
    } else {
        numeroPA = null
    }
    dataNascimento = new Date(dataNascimento);
    const result = await prisma.clientes.create({
        data: {
            numeroPA, nomeCliente, numeroCPF_CNPJ, nomeGerente, foto, presente, hora, dataNascimento, assembleiaId, nomeAdm, contato, sorteado: false
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