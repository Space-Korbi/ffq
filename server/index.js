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
const ffqRouter = require('./routes/ffq-router');
const questionRouter = require('./routes/question-router');
const imageRouter = require('./routes/image-router');

// * Create express app
const app = express();

// * Set Cors options

/**
 * A middleware function with no mount path.
 * The function is executed every time the app receives a request.
 */
app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

/**
 * This example shows a route and its handler function (middleware system).
 * The function handles GET requests to the '/' path.
 */

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

/**
 * Mount the routes on the '/api' path.
 * An array with a middleware sub-stacks that handle HTTP requests on the '/api' path.
 */
app.use('/api', [questionRouter, ffqRouter, imageRouter]);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
