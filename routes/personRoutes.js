const express = require('express');

const router = express.Router();

const Person = require('./../models/Person');

const  {jwtAuthmiddleware, generateToken} = require('./../jwt');


router.post('/signup',async (req,res) => {
    try {
    const data = req.body

    const newperson = new Person(data);

// save new person to data base

    const respnse = await newperson.save();
    console.log('data saved');

    const payload = {
        id: respnse.id,
        username: respnse.username
    }
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is :",token);

    res.status(200).json({respnse:respnse, token: token});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal server error '});
    }
    
})

// Login Route
router.post('/login', async(req, res) => {
    try {
        // Extract username and password from request body
        const{username , password} = req.body;

        //find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.get('/', jwtAuthmiddleware, async (req,res) => {
    try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal server error '});
    }
})

// parametrized 
router.get('/:workType',async(req,res) => {
    try {
      const workType = req.params.workType;
       if(workType == 'chef' || workType == 'waiter' || workType == 'manager') {
         const response = await Person.find({work: workType});
         console.log('reponse fetched');
         res.status(200).json(response);
       }else {
        res.status(404).json({error: 'invalid work type'}); 
      }

    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }


})


// put method for person

router.put('/:id', async (req,res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true,
            runValidators: true,
        })
        if(! response) {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const personId = req.params.id;
        const reponse = await Person.findByIdAndDelete(personId);
        if(! reponse) {
            return res.status(404).json({ error: 'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(reponse);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;
