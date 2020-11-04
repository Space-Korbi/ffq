const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')

const app = express()
const apiPort = 3000

/**
 * Copied sample code
 * TODO: change and add comment 
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

/**
 * TODO: Comment 
 * This function ...
 * @param {} ...
 * @returns {} ...
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))