var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shopifyRouter = require('./routes/shopify-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shopify', shopifyRouter);

app.get('/status', (req,res) =>{
  console.log('gottem');
  res.end();
});

//Start Server
app.listen(process.env.PORT || 3000, function(){
  console.log('Server is started on port 3000');
});

module.exports = app;
