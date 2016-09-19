let mongoose = require('mongoose');
let users = new mongoose.Schema({
	username: String,
	password: String,
})

module.exports = users;