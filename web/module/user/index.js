var express = require('express');
var app = module.exports = express();
var User = require('./user.js');

app.post('/register', function(req, res) {
    var user = new User(req.body);
    user.save(function(err, post){
        if (err) { return next(err);}
    });
    res.send('register');        
});

app.get('/signin', function(req, res) {
    var user = User.find({email : req.body.email}, function(err, user) {
        if (err) { return next(err);}
        res.send(user);
    }); 
    res.send('signin');
});

app.get('/list', function(req, res){
    res.send('list');
});
