// how workout documents look

// allow creation of SCHEMAS
const mongoose = require('mongoose')

const Schema = mongoose.Schema


// new schema -> pass object inside params
// All are required -> enforces Schema 
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
    // when a document is created -> it creates that property
}, { timestamps: true })

// model based on schema
// model applies that schema
// model interacts with the collection

// name, SCHEMA
module.exports = mongoose.model('Workout', workoutSchema)

// builds database for us
// add a workout model
