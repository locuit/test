const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc'); 


dotenv.config();
app.use(express.json());

// Swagger
const options = {
  
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the project',
    },
    components:{
      securitySchemes:{
        bearerAuth:  {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }         
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis : ['./routes/*.js']
};
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log('DB Connection Successful!')).catch(err => {console.log(err)});



app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/admin',adminRoute);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});


app.get('/', (req, res) => {
  res.send('Server is running');
});
