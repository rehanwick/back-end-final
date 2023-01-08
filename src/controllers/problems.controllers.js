const ProblemService = require('../services/problems.services');
const runCodeService = require('../services/runCode'); 
const indexService = require('../services/index.services') ; 
const scoreService = require('../services/score.services'); 
const problemAdd = async(req,res) => {
    if(Object.keys(req.body).length === 0 ){
        return res.status(400).json({
            status: 'error' , 
            message: `Request body is missing,and needs to have user details`
        }) ; 
    }

    try{
        const problem = await ProblemService.addProblems(req.body) ; 
        res.status(201).json({
            status: 'success' ,
            data: problem
        }) ; 
    } catch(error)
    {
        res.status(500).json({
            status : 'error' , 
            message : error
        })
    }
} ;

const getProblems = async(req,res) => {

    try
    {
        const problems = await ProblemService.getProblems() ; 

        res.json({
            status : 'success' , 
            data: problems 
        }) ; 
    } 
    catch(error)
    {
        res.status(500).json({
            status: 'error' ,
            message : error 
        })
    }
}

const getProblemsById = async (req ,res )=> {
    const {id} = req.params ; 
  try{
     const match = await ProblemService.getProblemsById(id) ; 
     if(!match) {
        res.status(404).json({
            status : 'error' , 
            message: `A problem not found `  
        })
     }

     res.json({
        status : 'success' ,
        data : match
     })
  } catch (error) {
        res.json({
            status : 'error', 
            message : error
        })
  }

}

const runCode = async(req,res) => {

    const {code , id , email , language = 'cpp'} = req.body ;
    if(code === undefined)
    {
        return res.status(400).json({
            sucess : false , 
            error: "Empty code body"
        })
    }
try{
    //need to generate a c++ files with constent from the req body 
    const filepath = await runCodeService.genrateFile( language , code  )

    //we need to run the command 
     const output = await runCodeService.executeCpp(filepath) ; 

    //we check the respond 
    const problem = await ProblemService.getProblemsById(id) ; 
    // User 
    // const user = await 
    const user = await indexService.getUser(email); 
    // console.log(user);

    let a = false ; 
    let solved ; 
    if(problem.output == output) {
        a =true ; 
        solved = true ; 
        if(!user.questions.includes(id))
        {    
            if(problem.categories == 'easy')
            {
                    await scoreService.addToEasy(email) ; 
            }
            else if(problem.categories == 'medium')
            {
                await scoreService.addToMedium(email) ; 
            }
            else if(problem.categories == 'hard')
            {
                await scoreService.addToHard(email) ; 
            }

            //adding problem to user
            await scoreService.addUserProblems(email,id) ; 
        }else {
            solved = false 
        }
    }

     return res.json({
        status : 'success', 
        data : { output ,
                a , 
                solved , 
        } }) ; 
    }
    catch(error) {
        res.status(500).json({
            status: 'error' , 
            message: error 
        }) ;
    } 
}

module.exports = {
    problemAdd , 
    getProblems , 
    getProblemsById ,
    runCode
}