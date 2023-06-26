const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API documentation',
    description: 'MongoDb with contacts'
  },
  host:'cit341teamproject.onrender.com', // host: 'l06.onrender.com' 'cit341teamproject.onrender.com'
  schemes: ['https '] //schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);