/**
 * * Why I dont use ES6 but CommonJS in server files
 * * 'import' vs 'require'
 * You can't selectively load only the pieces you need with 'require'
 * but with 'imports', you can selectively load only the pieces you need.
 * That can save memory.
 * Loading is synchronous(step by step) for 'require'
 * on the other hand 'import' can be asynchronous(without waiting for previous import)
 * so it can perform a little better than 'require'.
 * "Node.js fully supports ECMAScript modules as they are currently specified
 * and provides limited interoperability
 * between them and the existing module format, CommonJS."
 * "Expect major changes in the implementation
 * including interoperability support, specifier resolution, and default behavior."
 * Therefore we stick with commonJS.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * * Database
 * ./db is required to establish a DB connection
 * but it is not saved in a constant
 */
require('./db');

// const movieRouter = require('./routes/movie-router');
const ffqRouter = require('./routes/ffq-router');
const questionRouter = require('./routes/question-router');
const imageRouter = require('./routes/image-router');

// * Create express app
const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', [questionRouter, ffqRouter, imageRouter]);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
