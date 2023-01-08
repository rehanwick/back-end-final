const mongoose = require('mongoose') ; 

const User = mongoose.model('Users') ; 

const getIndex = () => {
    return User.find().sort(
        {
            total: -1
        }
    ) ; 
}

const getUser = (email) => {
    return User.findOne( {
        email : `${email}`
    }) ; 
}

module.exports = {
    getIndex , 
    getUser
}