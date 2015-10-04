var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ErrorLib = require("./lib/error.js");
var jwt = require("jsonwebtoken");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",function(req,res,next){
  req.lang=req.body.lang || req.query.lang || req.headers['lang'] || "en";
  req.dir = __dirname;
  var userAgent = req.get('User-Agent');
  if(userAgent.match(/Android/i))
    req.platformDevice="android"
  else if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/Apple/i)){
    req.platformDevice = "ios";
  }
  else
    req.platformDevice="unknow"
  next();
});
app.use("/apiv1/adverts",function(req,res,next){
  var token=req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token,'secretkeynodepop',function(err,decoded){
      if(err){
        ErrorLib.invalidToken(res,req);
      }
      req.decoded=decoded;
      console.log(decoded);
      next();
    });
  }else{
    return res.status(401).json({
      ok:false,
      error:'invalid token'
    });
  }
});
app.use('/apiv1/adverts', require("./routes/apiv1/adverts.js"));
app.use('/apiv1/users', require("./routes/apiv1/users.js"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
