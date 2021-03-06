var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var EE = require('events').EventEmitter;
var routeEvents = new EE();

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();

  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  console.log("username", req.body.username)
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return res.send("wat?")
      routeEvents.emit("hash", hash);
  });

  routeEvents.on("hash", function(hash) {
    newUser.save(function(err, data) {
      if (err) return res.send("this broke")
        routeEvents.emit("save", data);
    });
  });

  routeEvents.on("save", function(data) {
    newUser.generateToken(function(err, token) {
      if (err) return res.send("lulwat")
        res.json({token: token});
    });
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) {
      return res.status(401).json({msg: 'Meow1! Could not authenticat!'});
    };
    routeEvents.emit("findOne", user);
  });

  routeEvents.on("findOne", function(user) {
    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) return handleError(err, res);
      if (!hashRes) {
        return res.status(401).json({msg: 'Meow2! Could not authenticat!'});
      }
      routeEvents.emit("compare", user);
    });
  });

  routeEvents.on("compare", function(user) {
    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
        res.json({token: token});
    });
  });
});

usersRouter.get('/username', jsonParser, eatAuth, function(req,res) {
  res.json({username: req.user.username});
});
