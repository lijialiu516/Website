var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    username: {type:String, required: true},
    email: {type:String, required: true, index: {unique:true}, 
            validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    password: {type:String, required:true}
});

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        console.log('Generating password salt.');
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            console.log('Next pre save' + ' Error: ' + err);
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.isPasswordCorrect = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
