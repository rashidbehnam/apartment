const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const Joi=require('joi');
const config=require('config');

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50),
        password:Joi.string().required().min(5).max(255),
        email:Joi.string().required().email().min(5).max(50)
    });

    return schema.validate(user,{abortEarly:false});
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 5, max: 50 },
    email: { type: String, required: true,unique:true, min: 5, max: 50 },
    password: { type: String, required: true, max: 255 },
    favs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apartment',
            unique:true
        }
    ]
    
});

userSchema.methods.generateToken=function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },"somekey")
};

const User= mongoose.model('User',userSchema);


module.exports.User=User;
module.exports.validate=validateUser;
