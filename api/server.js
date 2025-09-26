const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Swagger disponível em https://floralles-api.vercel.app/api-docs');
});