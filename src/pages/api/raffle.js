import prisma from '../../../lib/prisma';

export default async function Raffle(req, res) {
    const { assembleiaId, tipoSorteio } = req.body;

    let matchCriteria = {
        presente: true,
        sorteado: { $in: [false, null] },
        assembleiaId: { $oid: assembleiaId }
    };

    // Ajusta o critério de match baseado no tipo de sorteio
    switch (tipoSorteio) {
        case 'associados':
            matchCriteria.associado = true;
            break;
        case 'naoAssociados':
            matchCriteria.associado = false;
            break;
        case 'todos':
            // Não precisa adicionar critério adicional para associado
            break;
        default:
            return res.status(400).json({ error: 'Tipo de sorteio inválido' });
    }

    try {
        const result = await prisma.clientes.aggregateRaw({
            pipeline: [
                { $match: matchCriteria },
                { $sample: { size: 1 } }
            ],
        });

        if (result.length) {
            const updateRaffle = await prisma.clientes.update({
                where: {
                    id: result[0]._id.$oid,
                },
                data: {
                    sorteado: true,
                    dataSorteio: new Date()
                },
            });
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'Nenhum cliente encontrado para o sorteio.' });
        }
    } catch (error) {
        console.error('Erro ao realizar o sorteio:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}