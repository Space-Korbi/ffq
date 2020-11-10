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

const db = require('./db');
const movieRouter = require('./routes/movie-router');
const userRouter = require('./routes/user-router');

// * Create express app
const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', movieRouter), app.use('/api', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
