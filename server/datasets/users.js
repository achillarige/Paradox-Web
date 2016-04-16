var mongoose = require('mongoose');
mongoose.connect('http://localhost/users') //users will stored in database users and collection User
module.exports = mongoose.model('User',{
	email: String,
	username: String,
	password: String,
	image: String,
	bio : String		
});
