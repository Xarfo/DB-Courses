const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

//Instatiates a server(app) object
const app = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the app
//cors and helmet middlewares are not used
app.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
app.get('/', (req, res) => {
    res.send('Test for root endpoint!')
});


//Create courses
app.post('/api/courses', (req, res) => {
    //Grab data from body
    const course = req.body;
    console.log(req.body);
    //Save data from body
    db.insert(course)
        .into('courses')
            .then(ids => {
                req.statusCode(201).json(ids);
            })
                .catch(err => {

                res.status(500).json(err);
            });

});


//Port & Port Listner
const port = 9000;
app.listen(port, () => console.log(`\n Listening on on port ${port}`));