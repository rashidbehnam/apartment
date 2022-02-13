const express =require('express');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./startups/logging')();
require('./startups/routes')(app);
require('./startups/db')();

const port=process.env.port || 3000;
app.listen(port,(err,res)=>{
    console.log("The app running on port ", port);
});