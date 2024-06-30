const express = require('express');

const router = express.Router();

const Menuitem = require('./../models/Menuitem');

// post method to add menuiitem
router.post('/', async (req,res) => {
    try {
        const data = req.body

        const newmenu = new Menuitem(data);
        const respnse = await newmenu.save();
        console.log('data saved');
        res.status(200).json(respnse);
    } catch(err) { 
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
})


// get method for menuitem

router.get('/',async (req,res) => {
    try{
        const data = await Menuitem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;
