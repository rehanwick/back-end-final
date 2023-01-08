
const indexServices = require('../services/index.services') ; 

const getIndex = async (req,res) =>
{
    
    try 
    {
          const user = await indexServices.getIndex() ; 

           res.json({
             status: 'success' ,
             data : user
           }); 
    
    }
    catch(error)
    {
        console.log(error);
    }
}

const getUserByEmail = async (req,res) => {
    const {email} = req.params ; 
    try{
        const user = await indexServices.getUser(email) ; 
        if(!user)
        {
           return res.status(404).json({
                status : 'error' , 
                msg : `user ${email} not found `
            })
        }
        res.json({
            status : 'success' , 
            data : user
        })
    }
    catch(error)
    {
            res.status(500).json({
                status : 'error' , 
                msg : `Server error ${error}`
            })
  }
}

module.exports = {
    getIndex  , 
    getUserByEmail
}