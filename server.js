const express = require('express');

const app = express();

const db = require('./db');


require('dotenv').config();
const passport = require('./auth');






const bodypParser = require('body-parser');

app.use(bodypParser.json());

const PORT = process.env.PORT || 3000;

// Middleware function  Logger middleware: Logs each request to /users routes

const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
    next();
}

app.use(logRequest);



const localAuthmiddleware = passport.authenticate('local', {session: false})
app.use(passport.initialize());
app.get('/',  (req,res) => {
    res.send('Welcome to our hotel');
})





// import the person

const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthmiddleware,personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
    console.log("listening on port 3000");
})