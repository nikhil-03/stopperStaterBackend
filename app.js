var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
const passport=require('passport')
const passportLocal=require('passport-local');
const bycrypt=require('bcryptjs');
const session=require('express-session');
const bodyParser=require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PINCODEAPI = require('./routes/utilityAPIs/getPinCodeDetails')
var GetCreateShops=require('./routes/pagesAPI/GetCreateShop')
var User=require('./routes/utilityAPIs/User');
var Product=require('./routes/pagesAPI/products')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"LetsKeepSecret",
  resave:true,
  saveUninitialized:true
}))
app.use(cookieParser("LetsKeepSecret"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
//////////////-----------------------------------/////////////

app.use('/', indexRouter);
app.use('/user', User);
app.use('/getPincodeData',PINCODEAPI);
app.use('/shops',GetCreateShops);
app.use('/product',Product)

app.post('/login',(req,res,next)=>{
  passport.authenticate("local",(err,user,info)=>{
    if(err)throw err;
    if(!user)res.send("No user exist")
    else{
      req.logIn(user,err=>{
        if(err) throw err;
        res.send("Success Autheticated");
        console.log(req.user);
      })
    }
  })(req,res,next)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
