// https://gist.github.com/mitsuruog/fc48397a8e80f051a145

// モジュールのインポート
var express = require('express');
var path = require('path'); // ファイルパス
var favicon = require('serve-favicon'); // ファビコンの設定
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

var app = express();

var socket = require('./routes/module/mod_socket.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // ログの出力方法
app.use(bodyParser.json()); // パラメータのパース方法
app.use(bodyParser.urlencoded({ extended: false })); // パース時のURLエンコード
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルのディレクトリ

app.use('/', routes);
app.use('/users', users);
app.use('/chat', chat);

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
