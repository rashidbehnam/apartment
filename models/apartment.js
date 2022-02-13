const {Schema,model}=require('mongoose');
const joi=require('joi');
joi.objectId=require('joi-objectid')(joi);

function validate(apartment){
    const schema=joi.object({
        country:joi.string().required(),
        city:joi.string().required(),
        rooms:joi.number().min(1).max(5).required(),
        description:joi.string(),
        location:joi.object({
            type:joi.string().valid("Point"),
            coordinates:joi.array().length(2).items(joi.number(),joi.number()).required().description('The location format should be like this {type:"Point",coordinates:[15.212456,23.321456]}')
        }).required(),
    });

    return schema.validate(apartment,{abortEarly:false});
}

function validateId(id){
  return joi.objectId().validate(id);
}
const locationSchema=new Schema({
    type:{type:String,default:"Point"},
coordinates:{type:[Number],required:true}
});
const aprtmentSchema=new Schema({
country:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
rooms:{
type:Number,
required:true
},
description:String,
location:{type:locationSchema,index:'2dsphere'},
user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
}
});

const Apartment= model('Apartment',aprtmentSchema);


module.exports.Apartment=Apartment;
module.exports.validate=validate;
module.exports.validateId=validateId;