const mongoose = require('mongoose');

// Define the MongoDB connection url

const mongoURL = 'mongodb://127.0.0.1:27017/mongodatabse'

// set up mongodb connection

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// get the default connection 

const db = mongoose.connection;

// Define event listner for database connection

db.on('connected',() => {
    console.log('connected to the MongoDB server');
});

db.on('error',(error) => {
    console.log('MongoDB connection error', error);
});
db.on('disconnected', ()=> {
    console.log('disconnected to the MongoDB server');
});

// exports database connection

module.exports = db;

