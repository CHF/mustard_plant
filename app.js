var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var routes = require('./routes/index'),
    accounts =  require('./routes/accounts'),
    users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost/mustard');

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.user = 'Andrew';
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/users', users);
app.use('/accounts', accounts);

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
    res.json({
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
