const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const novaPlanta = await prisma.plantas.create({
            data: {
                nome_p: req.body.nome_p,
                nome_c: req.body.nome_c,
                especie: req.body.especie,
                classe: req.body.classe,
                origem: req.body.origem,
                descricao: req.body.descricao,
                beneficios: req.body.beneficios,
                img: req.body.img,
            }
        });

        return res.status(201).json(novaPlanta); 
    } catch (error) {
        return res.status(400).json({ error: 'Erro ao cadastrar planta.' });
    }
};

const read = async (req, res) => {
    const plantas = await prisma.plantas.findMany();
    return res.json(plantas);
}

const readOne = async (req, res) => {
    try {
        const plantas = await prisma.plantas.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(plantas);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    try {
        const plantaAtualizada = await prisma.plantas.update({
            where: { id: Number(id) },
            data: dados
        });
        res.json(plantaAtualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.plantas.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};