const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');

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
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }



});

personSchema.pre('save',async function (next)  {
    const person = this;

    //Hash the password only if it has been modified or in new
    try { 
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();

    }catch(err) { 
        return next(err);

    }
})

personSchema.methods.comparePassword = async function(canditePassword) {
    try {
        const isMatch = await bcrypt.compare(canditePassword, this.password);
        return isMatch;
    }catch(err) {
        throw err;
    }
}
// create person models

const Person = mongoose.model('Person', personSchema);
module.exports = Person;