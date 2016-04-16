var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
mongoose.connect('http://localhost/users'); //users will stored in database users and collection User
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	username: String,
	password: String,
	image: String,
	bio : String		
});

UserSchema.pre('save', function beforeSave (next) {
	//setting the user to this object
	var user = this; 
	//only if the password has been modified/new
	if (!user.isModified('password')) { 
		return next();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function whenSalted (err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function whenHashed(err, hash) {
            if (err) return next(err);
            // override the plain password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function isSamePassword (inputPass, cb) {
    bcrypt.compare(inputPass, this.password, function whenCompared (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch); // if match -> true, else -> false
    });
};

module.exports = mongoose.model('User', UserSchema);
