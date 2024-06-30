const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB connection url

// const mongoURL = 'mongodb://127.0.0.1:27017/mongodatabse'

// const mongoURL = 'mongodb+srv://shreyashbhise16:mvsUFJGCq7qQ1XHO@cluster0.egm6oc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoURL = process.env.MONGODB_URL;

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

