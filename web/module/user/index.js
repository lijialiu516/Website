var express = require('express');
var app = module.exports = express();
var User = require('./user.js');

app.post('/register', function(req, res) {
    var user = new User(req.body);
    console.log('Receive register request');
    user.save(function(err, user){
        if (err) {res.send(err.message)}
        else res.send('register success');        
    });
});

app.get('/signin', function(req, res) {
    User.findOne({email : req.body.email}, function(err, user) {
        if (err) { return res.send(err.message);}
        user.isPasswordCorrect(req.body.password, function(err, isMatch) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.send(isMatch);
        });
    }); 
});
