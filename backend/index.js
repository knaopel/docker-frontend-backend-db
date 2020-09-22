const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRouter = require('./routes/todos');
const Promise = require('bluebird');

// const {
//     Pool,
//     Client
// } = require('pg');
const app = express();
const router = express.Router();
const port = 3001;

mongoose.Promise = Promise;

mongoose.connect('mongodb://sample:sample@localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!');
});

// const pool = new Pool({
//     connectionString: process.env.CONNECTION_STRING
// });



app.use('/todos', todoRouter);

app.get('/', (req, res) => res.send("The backend api is up!"));

app.get('/data', function (req, res) {
    pool.query('SELECT country, capital FROM country_and_capitals', [], (err, result) => {
        if (err) {
            return res.status(405).jsonp({
                error: err
            });
        }

        return res.status(200).jsonp({
            data: result.rows
        });
    });
});


app.listen(port, () => console.log(`Backend rest API listening on port ${port}!`));