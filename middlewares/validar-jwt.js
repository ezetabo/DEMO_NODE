const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async(req = request, res = response, next ) => {   
    try {
        const token = req.query.auth;        
        if(!token){
            return res.status(401).json({
                error: 'The token is required.'
            });
        }
        const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);   
        const user = await User.findOne({ localId: uid }).exec();
        if (!user){
            return res.status(401).json({
                error: 'Invalid token - user does not exist.'
            })
        }
        req.authUser = user;        
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({
            error: 'Invalid token.'
        })
    }
}

module.exports = {
    validarJWT
}