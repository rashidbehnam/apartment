const express=require("express");
const auth = require("../middleware/auth");
const router=express.Router();
const {Apartment,validate,validateId}=require('../models/apartment');

router.get('/',[auth],async (req,res)=>{
    const {country,city,rooms}=req.query;
   const query={
    ...(country && {country}),
    ...(city && {city}),
    ...(rooms && {rooms:Number.parseInt(rooms)}),
   };
   
const apartments=await Apartment.find(query);
    res.status(200).send(apartments);
});

router.get('/:id',[auth],async (req,res)=>{
    const {error}=validateId(req.params.id);
    if(error) return res.status(400).send(error);

    let {nearby}=req.query;
    nearby=nearby*1000 ||1000;
    const apartment=await Apartment.findById(req.params.id);
    if(!apartment) return res.status(400).send("Apartment with this id not found");

    const apartments=await Apartment.find({location:{$near:{$geometry:{"type" : "Point","coordinates" : apartment.location.coordinates},$maxDistance:nearby}}});
    res.status(200).send(apartments);
});

router.post('/',[auth],async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error);

    const apartment=new Apartment({...req.body,user:req.user._id});

    const result=await apartment.save();
    res.status(200).send(apartment);
});


module.exports =router;