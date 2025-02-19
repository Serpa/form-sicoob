import prisma from '../../../../lib/prisma'

export default async function countPresence(req, res) {
    const { id } = req.query
    // Verifica se o id é válido (não undefined, não vazio e não NaN)
    if (!id || id === 'undefined' || id === 'null') {
        return res.status(200).json({ message: 'ID inválido ou não fornecido.' });
    }
    const result = await prisma.clientes.findMany({
        where: {
            assembleiaId: id,
            presente: true,
        }
    })
    res.status(200).json(result)
}