require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/**
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable 'CROSS ORIGIN RESOURCE SHARING' with various options.
 */

// * Create express app
const app = express();

const corsOptions = {
  origin: 'http://localhost:8000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// serve static files such as images
app.use(express.static('uploads'));

// * Database
const db = require('./models');
const dbConfig = require('./config/db.config');

const Role = db.role;

function initial() {
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
}

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
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
const questionnaireRouter = require('./routes/questionnaire-router');
const questionRouter = require('./routes/question-router');
const imageRouter = require('./routes/image-router');

/**
 * Mount the routes on the '/api' path.
 * An array with middleware sub-stacks that handle HTTP requests on the '/api' path.
 */
app.use('/api', [questionRouter, questionnaireRouter, imageRouter]);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
