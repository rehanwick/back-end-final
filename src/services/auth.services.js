const mongoose = require('mongoose') ; 


const User = mongoose.model( 'Users' );

const addUser = (newUserDetails) => {
    return User.create(newUserDetails) ; 
}

const validateUser = async (loginUser) => {
      const user = await User.findOne({
        email : loginUser.email 
      }); 
      if(!user)
      {
        return null ; 
      }

      const isMatch =  loginUser.password === user.password ;

      if( !isMatch ) {
        return null;
      }

      return user ; 
}






module.exports = {
    addUser ,
    validateUser
}