
///////////// body parser to get data from body ////////
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
////////////////////////////////////////////////////////

//###################################### connecting to mongodb #########################################
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb',{useMongoClient:true});

mongoose.connection.once('open',function(){
  console.log("Connected to MongoDB !!!")
}).on('error',function(){
  console.log("Connection to MongoDB failed !!!");
})

//////////////// creating schema for registered user /////////////////////////
const Schema = mongoose.Schema;
const RegisterUserSchema = new Schema({
  username:String,
  email:String,
  password:String
});

const RegisterUser = mongoose.model('registerusercollections',RegisterUserSchema);
////////////////////////////////////////////////////////////////////////////

//////////////////////// creating schema for shortened url ///////////////////
const ShortenedUrlSchema = new Schema({
  long_url:String,
  shortened_url:String,
});

const ShortenURL = mongoose.model('shortenedurlcollections',ShortenedUrlSchema);

////////////////////////////////////////////////////////////////////////////


module.exports = function(app){

//#################### rendering web pages ##############################

app.get('/login',function(req,res){
  res.render('login');//login page rendering by its page name
});

app.get('/dashboard',function(req,res){
  res.render('dashboard');//dashboard page rendering by its page name
});

app.get('/signup',function(req,res){
  res.render('signup');//dashboard page rendering by its page name
});

//########################################################################

//######### handling mongodb operations of webpage #########

//-------------------------------- for signup ---------------------------
app.post('/signup_database',urlencodedParser,function(req,res){
const user = new RegisterUser({
  username:req.body.username,
  email:req.body.email,
  password:req.body.password
});

user.save().then(function(){
  console.log("Signup details inserted to 'registerusercollections' db...")
})

});
//--------------------------------------------------------------------------

//------------------------------- for dashboard ----------------------------

app.post('/dashboard_database',urlencodedParser,function(req,res){
  const user = new ShortenURL({
    long_url:req.body.long_url,
    shortened_url:req.body.shortened_url
  });

  user.save().then(function(){
    console.log("Short and long urls are inserted to 'shortenedurlcollections' db...")
  })

});
//-------------------------------------------------------------------------
//#######################################################################

};
