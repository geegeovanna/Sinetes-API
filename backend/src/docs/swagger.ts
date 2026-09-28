import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sinetes API',
      version: '1.0.0',
      description:
        'API RESTful para gerenciamento de sinetes do universo de Quarta Asa.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        SineteInput: {
          type: 'object',
          required: ['nome', 'descricao', 'categoria', 'nivelPerigo', 'raro'],
          properties: {
            nome: {
              type: 'string',
              example: 'Manipulação de Sombras',
            },
            descricao: {
              type: 'string',
              example: 'Permite controlar e moldar sombras.',
            },
            categoria: {
              type: 'string',
              example: 'Ofensivo',
            },
            nivelPerigo: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            raro: {
              type: 'boolean',
              example: true,
            },
          },
        },

        Sinete: {
          allOf: [
            {
              $ref: '#/components/schemas/SineteInput',
            },
            {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2026-09-28T03:54:12.216Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2026-09-28T03:54:12.216Z',
                },
              },
            },
          ],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
