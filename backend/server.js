// adding express package
// start with const -> require the express
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')


// create an express app
const app = express()

// any request that is sent to a server, it looks it has a body 
// if it does, pass the json and attach to the request object 
app.use(express.json())

// next function is important when use is finished
// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


/* 
- react to request
- route handler
- root website -> send a request and get a response from the parameters
- function to run in the root website
*/

// grabs all the routes and uses them on the app
// basically places routes into the app like a variable

// when fire a request on the route -> use the routes
app.use('/api/workouts', workoutRoutes)



// connect to MONGODB
mongoose.connect(process.env.MONGO_URI)

// when function is completed
    .then(() => {
        // listen to a port number
        // process.env.PORT is pulling the port from the .env file
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })

// find error if URI is incorrect or username / password is incorrect
    .catch((error) => {
        console.log(error)
    })




// state of the environment
process.env