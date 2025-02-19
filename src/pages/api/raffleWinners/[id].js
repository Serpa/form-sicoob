import prisma from '../../../../lib/prisma'

export default async function raffleWinners(req, res) {
    const { id } = req.query; // Acessa diretamente o id da query

    // Verifica se o id é válido (não undefined, não vazio e não NaN)
    if (!id || id === 'undefined' || id === 'null') {
        return res.status(200).json({ message: 'ID inválido ou não fornecido.' });
    }

    try {
        // Aqui, certifique-se de que o id é um ObjectId válido se for o caso
        if (id.length !== 24) {
            return res.status(400).json({ message: 'ID malformado. Deve ter 24 caracteres.' });
        }

        const result = await prisma.clientes.findMany({
            where: {
                assembleiaId: id,
                sorteado: true,
            },
            orderBy: {
                dataSorteio: 'asc',
            },
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar os dados.' });
    }
}
