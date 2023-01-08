const express = require( 'express' );

const ProblemCtrl = require('../controllers/problems.controllers'); 

const router = express.Router() ; 

router.post('/addproblem' ,  ProblemCtrl.problemAdd ) ;
router.get('/' ,ProblemCtrl.getProblems ); 
router.get('/:id' , ProblemCtrl.getProblemsById) ;
router.patch('/run' , ProblemCtrl.runCode);


module.exports = router ; 