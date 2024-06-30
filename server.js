const express = require('express');

const app = express();

const db = require('./db');





const bodypParser = require('body-parser');

app.use(bodypParser.json());





// import the person

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


app.listen(3000, () => {
    console.log("listening on port 3000");
})