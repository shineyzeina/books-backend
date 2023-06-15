require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/upload', express.static(path.join(__dirname, 'assets', 'upload')));
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/user', require('./users/users.controller'));
app.use('/book', require('./books/books.controller'));
app.use('/books', require('./books/books.controller'));
app.use('/author', require('./authors/authors.controller'));
app.use('/authors', require('./authors/authors.controller'));



// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
    
});