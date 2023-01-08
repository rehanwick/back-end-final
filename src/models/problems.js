const mongoose = require('mongoose') ; 

const ProblemSchema = new mongoose.Schema({
    name: {
        type : String , 
        required : true ,
    } ,
    discription: {
        type: String , 
        required : true 
    },
    output :{
        type: String , 
        required: true 
    }, 
    categories: {
        type:String, 
        enum:[
            'easy',
            'medium',
            'hard'
        ]
    }
}); 

mongoose.model('problems',ProblemSchema); 