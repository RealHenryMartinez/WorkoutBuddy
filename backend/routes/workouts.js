// express router
const express = require('express')

// reference functions from exported functions from workoutController
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')



// instance of a router
const router = express.Router()

// GET all workouts
router.get('/', getWorkouts )

// GET a single workout
// route parameter is the ID
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)


// export the routers
module.exports = router