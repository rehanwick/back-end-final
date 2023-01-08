const mongoose = require('mongoose') ; 

const User = mongoose.model('Users') ; 

const addUserProblems = async (email , id ) => {
    
    await User.updateOne(
        {
            email: `${email}`
        } , 
        {
            $push: {
                questions: `${id}`
            }
        }
    )
}

const addToEasy = async (email) => {
    
    await User.updateOne(
        {
            email : `${email}`
        } , 
        {
            $inc: {
                total: 10
            }
        }
    )

    await User.updateOne(
            {
                email : `${email}`
            } , 
            {
                $inc : {
                    'score.easy' : 10
                }
            }
        )
} 

const addToMedium = async (email) => {

    await User.updateOne(
        {
            email : `${email}`
        } , 
        {
            $inc: {
                total: 20
            }
        }
    )

    await User.updateOne(
            {
                email : `${email}`
            } , 
            {
                $inc : {
                    'score.medium' : 20
                }
            }
        )
} 
const addToHard = async (email) => {
    
    await User.updateOne(
        {
            email : `${email}`
        } , 
        {
            $inc: {
                total: 30
            }
        }
    )

    await User.updateOne(
            {
                email : `${email}`
            } , 
            {
                $inc : {
                    'score.hard' : 30
                }
            }
        )
} 



module.exports = {
    addToEasy,
    addToMedium , 
    addToHard , 
    addUserProblems
}