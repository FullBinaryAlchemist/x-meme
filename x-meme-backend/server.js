const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//adding SwaggerDocs
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


require('dotenv').config();

const app = express();
const swagger= express();
const port = process.env.PORT || 8081;

//setting the swagger docs
const swaggerOptions = {
  swaggerDefinition: {
  	openapi:'3.0.0',
    info: {
      version: "1.0.0",
      title: "Memes API",
      description: "Meme API Information",
      contact: {
        name: "Divyanshu Gupta",
        email: "dgdivyanshu@gmail.com"
      },
      servers: ["http://localhost:8080"]
    }
  },
  
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swagger.use("/swagger-ui/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
swagger.use(express.json());


app.use(cors());
app.use(express.json());

//mongoose DB connection 
const uri = process.env.DB_URI || "mongodb://localhost:27017/memes";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Routing 
const memesRouter = require('./routes/memes');
app.use('/memes',memesRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

swagger.listen(8080,()=>{
   console.log(`Swagger is running on port: 8080`);
});
swagger.use("/memes",memesRouter);

module.exports= app