const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//adding SwaggerDocs
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
      servers: ["http://localhost:"+port]
    }
  },
  
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger-ui/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI || "mongodb://localhost:27017/memes";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const memesRouter = require('./routes/memes');
app.use('/memes',memesRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports= app