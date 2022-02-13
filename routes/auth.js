const express=require('express');
const joi=require('joi');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User}=require('../models/user');

function validate(user){
    const schema=joi.object({
        email:joi.string().required().email().min(5).max(50),
        password:joi.string().min(5).max(255) });
        return schema.validate(user);
    };
router.get('/', (req,res)=>{
    res.send('login user');
});
router.post('/',async (req,res)=>{
    
const {error}=validate(req.body);
if(error) return res.status(400).send(error);

const user=await User.findOne({email:req.body.email});
if(!user) return res.status(404).send("The user not found!");

const salt=await bcrypt.genSalt(10);
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("The password you entered is invalid!");
    const token=user.generateToken();
    
    res.send(token);
});




module.exports = router;