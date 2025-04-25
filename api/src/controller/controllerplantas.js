const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const matricula = await prisma.plantas.create({
            data: {
                nome_p:    req.body.nome_p, 
                nome_c:    req.body.nome_c, 
                especie:    req.body.especie, 
                classe:     req.body.classe, 
                origem:     req.body.origem, 
                descricao:  req.body.descricao, 
                beneficios: req.body.beneficios, 
                img:        req.body.img, 
            }
        });

        res.status(201).json(plantas);
    } catch (error) {
        if (error.code == 'P2003') {
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        } else {
            res.status(400).json(error);
        }
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
    try {
        const plantas = await prisma.plantas.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(plantas);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

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