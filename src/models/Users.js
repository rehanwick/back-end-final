const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    name: {
        type : String , 
        required : true 
    } ,
    email: {
        type: String , 
        required : true 
    },
    password :{
        type: String , 
        required: true 
    }, 
    questions: [

    ] , 
    score: {
        easy : {
            type:Number , 
            default: 0 
        } ,
        medium : {
            type:Number , 
            default: 0 
        }, 
        hard : {
            type:Number , 
            default : 0 
        }
    } , 
    total: {
        type:Number , 
        default:0 
    } ,
    role : {
        type:String , 
        enum: [
            'admin',
            'general'
        ],
        default: 'general'
    }
}); 

mongoose.model( 'Users', UserSchema );

module.exports = {
    UserSchema 
}