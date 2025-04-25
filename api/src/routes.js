const express = require('express');
const routes = express.Router();

const Plantas = require('./controller/controllerplantas')

routes.post('/plantas', Plantas.create);
routes.get('/plantas', Plantas.read);
routes.get('/plantas/:id', Plantas.readOne);
routes.put('/plantas/:id', Plantas.update);
routes.delete('/plantas/:id', Plantas.remove);

module.exports = routes;
