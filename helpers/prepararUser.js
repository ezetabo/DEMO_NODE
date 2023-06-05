const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');

const newUser = (email, password)=>{
    const localId = uuidv4();
    const user = new User({ email, password, localId });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    return user;
}


module.exports ={
    newUser
}