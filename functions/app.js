//server part
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var authMiddleware = require('./middleware/authMiddleware');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var signupRouter = require('./routes/signup');
var app = express();
var cors = require('cors');


//tito's style
var apiRouter = require('./routes/apiRoutes');
var htmlRouter = require('./routes/htmlRoutes');

// view engine setup
// use jade as templete
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'jade');


app.use(cors({ origin: true }));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    /*
    if (req.method === 'OPTIONS') {
      // Request methods you wish to allow
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      return res.status(200).json({});
    }
    */

    next();
    
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(authMiddleware);


//app.use(cors({origin: true}));



// basic routes(endpoint)
//app.use('/', indexRouter);
//app.use('/index', indexRouter);
//app.use('/user', userRouter);



// tito's style -- separate API routes from the rest
app.use('/api', apiRouter);



app.use('/', htmlRouter);







// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('listen to 3000'));

module.exports = app;
