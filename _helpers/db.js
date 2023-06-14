const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
	User: require('../users/user.model'),
	Book: require('../books/book.model'),
	Author: require('../authors/author.model'),
	Institution: require('../institutions/institution.model')
};