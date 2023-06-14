require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/upload/authors', express.static(path.join(__dirname, 'upload', 'authors')));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/user', require('./users/users.controller'));
app.use('/book', require('./books/books.controller'));
app.use('/books', require('./books/books.controller'));
app.use('/author', require('./authors/authors.controller'));
app.use('/authors', require('./authors/authors.controller'));
app.use('/institution', require('./institutions/institutions.controller'));
app.use('/institutions', require('./institutions/institutions.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
