var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

// connection to the DB
require('./lib/connectMongoose');

// require passport
require('./passport/local-auth')

// connection to API
const usersApi = require('./routes/api/users')
const postsRouter = require('./routes/api/posts')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=> {
  app.locals.registerMessage = req.flash('registerMessage')
  app.locals.loginMessage = req.flash('loginMessage')
  next();
});

// API routes
app.use('/api/posts', postsRouter);

app.use('/api/users', usersApi);
app.use('/', require ('./routes/api/login'));

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
