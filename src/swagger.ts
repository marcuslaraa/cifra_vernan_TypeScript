import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cifra Vernan',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;