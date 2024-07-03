const jwt = require('jsonwebtoken');

const jwtAuthmiddleware = (req,res,next) => {
    // Extract the jwt from the request headers

    const token = req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try { 
        // verify the jwt token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // Attach user information to the  request object
        req.user = decoded
        next();

    }catch(err) {
        console.error(err);
        res.status(401).json({error: 'Invalid token'})
    }
}

// function to generate jwt token

const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthmiddleware, generateToken};