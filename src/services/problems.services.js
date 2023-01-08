const mongoose = require('mongoose') ; 

const problems = mongoose.model('problems') ; 

const addProblems = (newProblem) => {
    return problems.create(newProblem) ; 
}

const getProblems= () => {
    return problems.find() ; 
}

const getProblemsById = (_id) => {
    return problems.findById(_id) ; 
}

module.exports = {
    addProblems ,
    getProblems ,
    getProblemsById
}