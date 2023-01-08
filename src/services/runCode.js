const fs = require('fs') ; 
const path = require('path') ; 
const { v4:uuid } = require('uuid')
const {exec} = require("child_process") ; 

//code folder 
const dirCodes = path.join(__dirname , "codes") ; 

//out-put path 
const outputPath = path.join(__dirname,"outputs")

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, {recursive : true }) 
}

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes , {recursive:true}) ; 
}


const genrateFile = async (formate ,content) => {
    const jobId = uuid() ; 
    const filename = `${jobId}.${formate}` ;
    const filepath = path.join(dirCodes,filename) ; 
    await fs.writeFileSync(filepath, content) ; 
    return filepath ; 
}; 

const executeCpp = (filepath) => {
    const pathToSrc =   `src/services/codes/`
    const jobIdArray = filepath.split('/') ; 
    const filename = jobIdArray[jobIdArray.length - 1 ] ;  
    const jobId = filename.split('.')[0] ;  
    const fileExe = path.join(pathToSrc , filename) ; 
    const outPathExe = path.join(`src/services/outputs`,`${jobId}.out`);
    return new Promise((resolve , reject ) => {
           exec(`g++ ${fileExe} -o ${outPathExe} && cd src/services/outputs && ./${jobId}.out`,
           (error , stdout , stderr) => {
            if(error) {
                resolve({error,stderr}) ; 
            }
            if(stderr){
                resolve(stderr) ; 
            }
            resolve(stdout) ; 
           }
           ) ; 
    })
}



module.exports = {
    genrateFile ,
    executeCpp 
}