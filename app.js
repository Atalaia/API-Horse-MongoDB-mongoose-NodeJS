var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var horsesRouter = require('./routes/horses') ;
var ownersRouter = require('./routes/owners') ;

var app = express();

require('dotenv').config({ path: __dirname + '/.env'});

//MONGOOOSE OOKKKK 
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = mongoose; 
const db = mongoose.connection; 
db.on("error", () => {
console.log("> error occurred from the database"); });
db.once("open", () => {
console.log("> successfully opened the database");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/horses', horsesRouter);
app.use('/owners', ownersRouter);

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
