const express = require('express');

const app = express();

const db = require('./db');

require('dotenv').config();





const bodypParser = require('body-parser');

app.use(bodypParser.json());

const PORT = process.env.PORT || 3000;

app.get('/',  (req,res) => {
    res.send('Welcome to our hotel');
})





// import the person

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


app.listen(PORT, () => {
    console.log("listening on port 3000");
})