const apartments=require('../routes/apartments');
const auth=require('../routes/auth');
const users=require('../routes/users');
const favs=require('../routes/favs');
const error=require('../middleware/error');
module.exports=function(app){
app.use('/api/apartments',apartments);
app.use('/api/auth',auth);
app.use('/api/users',users);
app.use('/api/favs',favs);
app.use(error);
}