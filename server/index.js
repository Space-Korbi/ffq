/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');

// * Create express app
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./helpers/error-handling');

/**
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable 'CROSS ORIGIN RESOURCE SHARING' with various options.
 */
app.disable('x-powered-by');

const corsOptions = {
  origin: 'http://localhost:8000'
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '7mb', extended: true }));
// serve static files such as images
app.use(express.static('uploads'));

// * Database
const db = require('./helpers/db');
const dbConfig = require('./config/db.config');

const Role = db.role;

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

// Routes
const userRouter = require('./users/user.router');
const questionnaireRouter = require('./questionnaires/questionnaire.router');
const questionRouter = require('./questions/question.router');
const imageRouter = require('./images/image.router');

/**
 * Mount the routes on the '/api' path.
 * An array with middleware sub-stacks that handle HTTP requests on the '/api' path.
 */
app.use('/api', [userRouter, questionRouter, questionnaireRouter, imageRouter]);

// app.use([errorHandler.errorHandler]);

const swaggerDocument = require('./Questionnaire.v1.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
