import prisma from '../../../lib/prisma'
import dayjs from "dayjs";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
}

export default async function ClientesAPI(req, res) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            // Criação da assembleia
            const assembleiaCreate = await tx.Assembleia.create({
                data: req.body.assembleia,
            });

            // Preparar dados dos clientes
            const clientes = req.body.clientes.map((cliente) => ({
                nomeCliente: cliente.nomeCliente,
                nomeGerente: cliente.nomeGerente,
                dataNascimento: dayjs(cliente.dataNascimento).toDate(),
                numeroCPF_CNPJ: cliente.numeroCPF_CNPJ.toString(),
                numeroPA: parseInt(cliente.numeroPA),
                assembleiaId: assembleiaCreate.id,
                sorteado: false,
                associado: true,
            }));

            // Criar clientes
            await tx.clientes.createMany({
                data: clientes
            });

            // Buscar clientes recém-criados
            const clientesFind = await tx.clientes.findMany({
                where: {
                    assembleiaId: assembleiaCreate.id
                }
            });

            // Preparar dados dos administradores com base nos clientes encontrados
            const adms = req.body.adms.map((adm) => {
                const cliente = clientesFind.find((c) =>
                    c.numeroCPF_CNPJ === adm.numeroCPF_CNPJ || c.nomeCliente === adm.nomeCliente
                );
                delete adm.numeroCPF_CNPJ;
                delete adm.nomeCliente;

                return {
                    ...adm,
                    clienteId: cliente?.id
                };
            });

            // Criar administradores
            await tx.Administradores.createMany({
                data: adms
            });

            return {
                assembleia: assembleiaCreate,
                clientes: clientesFind,
                administradores: adms
            };
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao processar os dados", details: error });
    }
}
