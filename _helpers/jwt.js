const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/user/authenticate',
            '/user/register',
<<<<<<< HEAD
            '/uploads/*'
=======
            '/authors/upload/*'
>>>>>>> origin/books-backend-joe
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // if the user is not admin, he is not allowed to add/edit/delete books/authors
    // if the user is not an admin, he is not allowed to list/edit/delete users.
    // revoke token if user no longer exist
    if (!user || (req.method != "GET" && req.path.indexOf("/book/") > -1 && req.path.indexOf("/author/") > -1 && user.type != "admin") || (req.path.indexOf("/users") > -1 && user.type != "admin")) {
        console.log("Request is not allowed!!!");
        console.log(user)
        return done(null, true);
    }

    done();
};