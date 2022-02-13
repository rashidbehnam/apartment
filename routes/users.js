const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const _=require('lodash');

const {User,validate}=require('../models/user');
router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error);

    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("A user with this email is already existed!");

    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(req.body.password,salt);

    user=new User({
        name:req.body.name,
        password:hashed,
        email:req.body.email
    });

    user=await user.save();
    const token=user.generateToken();
    res.header("x-auth-token",token).send(_.pick(user,['_id','name','email']));
});



module.exports=router;