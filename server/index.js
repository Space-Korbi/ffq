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

/**
 * * Database
 * ./db is required to establish a DB connection
 */
require('./db');

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
