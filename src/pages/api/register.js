
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]";
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
    const data = await getServerSession(req, res, authOptions);
    console.log(data);
    let { numeroPA, nomeCliente, numeroCPF_CNPJ, dataNascimento, nomeGerente, foto, presente, hora, assembleiaId, nomeAdm, descricao, contato, associado } = await req.body

    if (numeroPA) {
        numeroPA = parseInt(numeroPA)
    } else {
        numeroPA = null
    }
    dataNascimento = new Date(dataNascimento);
    const result = await prisma.clientes.create({
        data: {
            numeroPA,
            nomeCliente: nomeCliente ? nomeCliente.toUpperCase() : '',
            numeroCPF_CNPJ,
            nomeGerente: nomeGerente ? nomeGerente.toUpperCase() : '',
            foto,
            presente,
            hora,
            dataNascimento,
            assembleiaId,
            nomeAdm,
            contato,
            sorteado: false,
            associado,
            userId: data.user.id
        }
    })

    if (nomeAdm) {
        const createAdm = await prisma.Administradores.create({
            data: {
                nomeAdm: nomeAdm.toUpperCase(),
                descricao: descricao,
                clienteId: result.id
            }
        })
    }
    console.log(result);
    res.json(result)
}