require('express-async-errors');
const config=require('config');
module.exports=function(){
    
    if(!config.get("jwtPrivateKey")){
        console.log("FATATL ERROR: NO SECRETE KEY PROVIDED!");
        process.exit(1);
    }
    process.on('uncaughtException',(ex)=>{
        console.log("WE GOT AN UNCAUGHT EXCEPTION! ",ex);
    });
    process.on('unhandledRejection',(ex)=>{
        console.log("WE GOT AN UNHANDLED REJECTION! ",ex);
        process.exit(1);
    });

}