const mongoose = require('mongoose');
const { type } = require('os');

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: String,
        required: true
    }



});

// create person models

const Person = mongoose.model('Person', personSchema);
module.exports = Person;