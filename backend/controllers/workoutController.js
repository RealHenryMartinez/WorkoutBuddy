// functions to reference each route file -> cleaner code on router


const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // leave object blank because we want a differnet # of workouts
    // newest on top
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
} 



// get a single workout
const getWorkout = async (req, res) => {
    // grab id property from ROUTE parameter
    const {id} = req.params

    // checks if the ID is valid, if not, return status
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    // if workout doesn't exist, return an error
    if (!workout) {
        // if it doesn't return, it will fire the other code
        return res.status(404).json({error: 'No such workout'})
    }
    // there is a workout
    res.status(200).json(workout)
} 

// create a new workout
const createWorkout = async (req, res) => {
    // extract these objects
    const {title, load, reps} = req.body

    // which fields are empty and send it to client
    let emptyFields = []


    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    // checking length of array -> send error rather than executing it
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // gets new document when created
    // USING A WORKOUT MODEL TO CREATE A NEW DOCUMENT
    // ADD DOC TO DB
    try {
        // all properties are required
        const workout = await Workout.create({title, load, reps})

        // send a response
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // property name is _id 
    // find if _id equal to id
    const workout = await Workout.findOneAndDelete({_id: id})


    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // the second is the data we update
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // the request body is spread into a new object
        // whatever property is on the body, update those on the DOC
        ...req.body
    })


    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}



// EXPORT FUNCTIONS

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}