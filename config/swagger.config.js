import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pastas Milisenda API',
      version: '1.0.0',
      description: 'API para el e-commerce de Pastas Milisenda',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'dev@pastasmilisenda.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'https://pastasmilisenda.herokuapp.com',
        description: 'Servidor de producción'
      }
    ]
  },
  apis: [
    './docs/*.swagger.js',
    './routes/*.js'
  ]
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
