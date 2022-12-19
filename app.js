var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.authTokens = {};
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var not1Router = require('./routes/not1');
var not2Router = require('./routes/not2');
var not3Router = require('./routes/not3');
var not4Router = require('./routes/not4');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/not1', not1Router);
app.use('/not2', not2Router);
app.use('/not3', not3Router);
app.use('/not4', not4Router);
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
