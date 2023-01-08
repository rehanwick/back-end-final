
const UserService = require('../services/auth.services'); 
const { Errors } = require( '../constants' );
const jwt = require('jsonwebtoken') ;
const register = async ( req , res ) => {
    if(Object.keys(req.body).length === 0 ){
        return res.status(400).json({
            status: 'error' , 
            message: `Request body is missing,and needs to have user details`
        }) ; 
    }

    try {
        const user = await UserService.addUser( req.body );
        if(!user) 
        {
            res.status(404).json({
                status: 'error' , 
                msg : 'Msg or password wrong'
            })
        }
        const userObj = user.toObject() ; 
        delete userObj.password ; 

        res.status(201).json({
            status: 'success' , 
            data: userObj 
        }) ; 
    } catch(error)
    {
        res.status(500).json({
            status : 'error' , 
            message : error
        })
    }

};

const login = async (req,res,next) => {
    if( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json({
            status: 'error',
            message: `Request body is missing, and needs to have login details`
        });
    }

    try{
        const user = await UserService.validateUser(req.body) ; 

        if( !user ) {
            return res.status(401).json({
                status : 'error' , 
                message : 'unauthorized user '
            })
        }

        //jwt token
        const claims = {
            email: user.email,
            role: user.role
        };
        
        jwt.sign( claims, process.env.JWT_SECRET, { expiresIn: '7d' }, ( err, token ) => {
            if( err ) {
                err.name = Errors.InternalServerError;
                return next( err );
            }

            res.json({
                status: 'success',
                data: {
                    email: user.email,
                    role: user.role,
                    token
                }
            });
        });

        // jwt.sign(claims , process.env.JWT_SECRET)
    }
    catch(error) {
        res.status(500).json({
            status : 'error', 
            message :  `Internal Server Error ${error}`
        })
    }
}

module.exports = {
    register ,
    login
}