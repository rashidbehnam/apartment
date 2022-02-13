const {User}=require('./user');
const {Apartment}=require('./apartment');
const mongoose=require('mongoose');


mongoose.connect("mongodb://localhost/apartment",{ useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>console.log("mongodb connected successfuly!"))
.catch((err)=>console.log("oops something went wrong with mongodb ",err));


let defaultUser="620131402196520060e5d90a";

const seedApartments=[
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:2,
        description:"imreza",
        location:{
            type:"Point",coordinates:[37.544790, 45.055200]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:1,
        description:"imreza",
        location:{
            type:"Point",coordinates:[37.545322, 45.059191]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:3,
        description:"bakery",
        location:{
            type:"Point",coordinates:[37.551253, 45.078947]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:3,
        description:"valiasr",
        location:{
            type:"Point",coordinates:[37.562720, 45.077985]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:1,
        description:"bagrezvan",
        location:{
            type:"Point",coordinates:[37.575484, 45.048202]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:4,
        description:"ashnaabad-anhar",
        location:{
            type:"Point",coordinates:[37.616508, 44.962693]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"urmia",
        rooms:2,
        description:"roodaki",
        location:{
            type:"Point",coordinates:[37.495813, 45.064552]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"tabriz",
        rooms:2,
        description:"",
        location:{
            type:"Point",coordinates:[38.132961, 46.088509]
        }
    },  
    {
        user:defaultUser,
        country:"iran",
        city:"mashhad",
        rooms:2,
        description:"",
        location:{
            type:"Point",coordinates:[36.296514, 59.578617]
        }
    },  
    {
        user:defaultUser,
        country:"turkey",
        city:"kapadokya",
        rooms:2,
        description:"",
        location:{
            type:"Point",coordinates:[38.354283, 35.088320]
        }
    },  
    {
        user:defaultUser,
        country:"turkey",
        city:"kapadokya",
        rooms:1,
        description:"",
        location:{
            type:"Point",coordinates:[38.353017, 35.089159]
        }
    },  
     
];

async function  createUser(){
    const user=await User.create({
        name:"rashid",
        email:"rashidbehnam2012@gmail.com",
        password:"$2b$10$CSaHhXs9Jl27u4wvrA9zGO6/p3jCfsc8obdBr3OjUFMKZRpjNvurC"
    });
   
    defaultUser=user._id.toString();
}
async function  createApartments(){
    if(!defaultUser) return console.log("No user id provided!");

    await Apartment.deleteMany({});
    await Apartment.insertMany(seedApartments);
}

createUser()
.then(()=>
createApartments())
.then(()=>{
    mongoose.connection.close();
});



 



