require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/**
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable 'CROSS ORIGIN RESOURCE SHARING' with various options.
 */

/**
 * * Database
 * ./db is required to establish a DB connection
 */
require('./db');

// const movieRouter = require('./routes/movie-router');
const questionnaireRouter = require('./routes/questionnaire-router');
const questionRouter = require('./routes/question-router');
const imageRouter = require('./routes/image-router');

// * Create express app
const app = express();

/**
 * A middleware function with no mount path.
 * The function is executed every time the app receives a request.
 */

app.options('*', cors());
app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

/**
 * Mount the routes on the '/api' path.
 * An array with a middleware sub-stacks that handle HTTP requests on the '/api' path.
 */
app.use('/api', [questionRouter, questionnaireRouter, imageRouter]);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
