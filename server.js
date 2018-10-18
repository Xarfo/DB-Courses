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

//Get courses
app.get('/api/courses', (req, res) => {
    //Get data
    db('courses')
            .then(courses => {
                res.status(200).json(courses);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});

//Get courses by id
app.get('/api/courses/:id', (req, res) => {
    //Save data by id
    const {id} = req.params;
    console.log(id);
    db('courses')
        .where({id})
            .then(course => {
                res.status(200).json(course);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

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
                res.status(201).json(ids);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});

//Update courses
app.put('/api/courses/:id', (req, res) => {
    //Grab data from body
    const {id} = req.params;
    const {name} = req.body;
    const updatedCourse = {name};
    console.log(updatedCourse);
    //Update  data of the body
    db('courses')
        .where({id})
            .update(updatedCourse)
                .then(updatedCourse => {
                    res.status(201).json(updatedCourse);
            })
                        .catch(err => {
                            res.status(500).json(err);
            });

});


//Port & Port Listner
const port = 8000;
app.listen(port, () => console.log(`\n Listening on on port ${port}`));