const mongoose=require('mongoose');

module.exports=function(){
    mongoose.connect("mongodb://localhost/apartment",{ useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>console.log("mongodb connected successfuly!"))
.catch((err)=>console.log("oops something went wrong with mongodb ",err));

}