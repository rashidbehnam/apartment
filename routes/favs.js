const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const auth=require('../middleware/auth');
const {User}=require('../models/user');
const {validateId}=require('../models/apartment');

router.get('/',[auth],async (req,res)=>{
    const id=req.user._id;
    const favs=await User.findById(id)
    .populate('favs','country city rooms -_id')
    .select('name favs');
    res.status(200).send(favs);
});

router.post('/:id',[auth],async(req,res)=>{

    const user=await User.findByIdAndUpdate(req.user._id,
        {
            $addToSet:{
                favs:req.params.id
            }
        });

    res.status(200).send(user);
    
  
    res.status(200).send(user.favs);
});

router.delete('/:id',[auth],async (req,res)=>{
 const user=await User.findByIdAndUpdate(req.user._id,
        {
            $pull:{
                favs:req.params.id
            }
        });

    res.status(200).send(user.favs);
});



module.exports =router;