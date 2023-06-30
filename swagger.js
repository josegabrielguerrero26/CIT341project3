const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API documentation',
    description: 'MongoDb with contacts'
  },
  host: 'cit341teamprojec.onrender.com',
  // host: "localhost:8080",
  schemes: ["https"],
  // schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);