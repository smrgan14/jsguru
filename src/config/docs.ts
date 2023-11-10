// eslint-disable-next-line import/no-extraneous-dependencies
import { SwaggerDefinition } from 'swagger-jsdoc';
import env from './env';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'JSGuru routes documentation',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://${env.baseUrl}:${env.port}/api/v1`,
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
  },
  security: [{
    bearerAuth: [],
  }],
};

export default swaggerDefinition;
