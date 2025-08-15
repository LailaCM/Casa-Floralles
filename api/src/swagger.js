const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Casa Floralles API',
      version: '1.0.0',
      description: 'Documentação da API Casa Floralles.<br>API de cadastro e consulta de plantas com autenticação JWT.',
      contact: {
        name: 'Casa Floralles Dev',
        email: 'contato@casafloralles.com',
        url: 'https://github.com/seuusuario',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'usuario@email.com' }
          }
        },
        Planta: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome_p: { type: 'string', example: 'Manjericão' },
            nome_c: { type: 'string', example: 'Ocimum basilicum' },
            especie: { type: 'string', example: 'Lamiaceae' },
            classe: { type: 'string', example: 'Magnoliopsida' },
            origem: { type: 'string', example: 'Ásia e África' },
            descricao: { type: 'string', example: 'Erva aromática de folhas verdes utilizadas na culinária e medicina natural.' },
            beneficios: { type: 'string', example: 'Possui propriedades antioxidantes, anti-inflamatórias e auxilia na digestão.' },
            img: { type: 'string', example: 'https://static.vecteezy.com/system/resources/previews/022/149/272/non_2x/basil-leaf-isolated-png.png' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: 'Usuários',
        description: 'Endpoints de autenticação e cadastro de usuários',
      },
      {
        name: 'Plantas',
        description: 'Endpoints de CRUD de plantas',
      },
    ],
    paths: {
      '/register': {
        post: {
          tags: ['Usuários'],
          summary: 'Cadastra um novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'usuario@email.com' },
                    password: { type: 'string', example: 'senha123' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Usuário criado' },
            400: { description: 'Erro ao criar usuário' }
          }
        }
      },
      '/login': {
        post: {
          tags: ['Usuários'],
          summary: 'Realiza login e retorna um token JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'usuario@email.com' },
                    password: { type: 'string', example: 'senha123' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login realizado com sucesso' },
            401: { description: 'Credenciais inválidas' }
          }
        }
      },
      '/plantas': {
        get: {
          tags: ['Plantas'],
          summary: 'Lista todas as plantas',
          responses: {
            200: {
              description: 'Lista de plantas',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Planta' }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Plantas'],
          summary: 'Cadastra uma nova planta (requer autenticação)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Planta' }
              }
            }
          },
          responses: {
            201: { description: 'Planta cadastrada' },
            401: { description: 'Token inválido ou expirado' }
          }
        }
      },
      '/plantas/{id}': {
        get: {
          tags: ['Plantas'],
          summary: 'Busca uma planta pelo ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Planta encontrada',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Planta' }
                }
              }
            },
            404: { description: 'Planta não encontrada' }
          }
        },
        put: {
          tags: ['Plantas'],
          summary: 'Atualiza uma planta (requer autenticação)',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Planta' }
              }
            }
          },
          responses: {
            200: { description: 'Planta atualizada' },
            401: { description: 'Token inválido ou expirado' },
            404: { description: 'Planta não encontrada' }
          }
        },
        delete: {
          tags: ['Plantas'],
          summary: 'Remove uma planta (requer autenticação)',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            204: { description: 'Planta removida' },
            401: { description: 'Token inválido ou expirado' },
            404: { description: 'Planta não encontrada' }
          }
        }
      }
    }
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;