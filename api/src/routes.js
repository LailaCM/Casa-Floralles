const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'secretaqui';

const Plantas = require('./controller/controllerplantas')

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hash }
    });
    res.json({ message: 'Usuário criado', user: { id: user.id, email: user.email } });
  } catch (e) {
    res.status(400).json({ error: 'Email já cadastrado' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
routes.post('/plantas', Plantas.create);
routes.get('/plantas', Plantas.read);
routes.get('/plantas/:id', Plantas.readOne);
routes.put('/plantas/:id', Plantas.update);
routes.delete('/plantas/:id', Plantas.remove);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get('/perfil', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  res.json({ id: user.id, email: user.email });
});

module.exports = routes;
