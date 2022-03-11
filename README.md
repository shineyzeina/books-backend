# Backend-api
- Install NodeJS and NPM from  https://nodejs.org/en/download/
- Install MongoDB Community Server from  https://www.mongodb.com/download-center.
- Install all required npm packages by running ```npm install```
- Start the api by running ```npm start``` from the command line in the project root folder, you should see the message ```Server listening on port 4000```

## Create an admin:
- Modify this script: automateUser.js to set the admin fields.

- Run : ```node ./automateUser.js```

## Apis:

### Register:
Note: A new user is by default of type "reader". Only those that will manage users will be admin, and this should be done from the backend directly.

http://localhost:4000/user/register

Method: Post

Body: 
```
{
    "firstName": "Zeina",
    "lastName": "Reader",
    "username": "zeinaReader",
    "password": "test",
    "email":"shineyzeina@gmail.com",
    "dob":"1984-10-11",
    "phone":"78906469"
} 

```
### Authenticate/login

http://localhost:4000/user/authenticate

Method: Post
```
Body:
{
    "username": "zeinaReader",
    "password": "test"
}
```


### Delete user:
http://localhost:4000/user/[id]

example: http://localhost:4000/user/613d10d170c0e213d0da68de

Method: Delete

Token Required


### Update user
http://localhost:4000/user/[id]

http://localhost:4000/user/613d1e89b2107e172ccfc498

Method: Put

Token Required

Body:

Any part of the user object example:

{
    "email": "vivo@gmail.com",
    "phone": "009611368773"
}

### List users:

http://localhost:4000/users

Method: Get

Token Required

### Create author
http://localhost:4000/author

Method: Post

Token Required
```
Body:
{
    "first_name": "Alex",
    "last_name": "Lux"
}
```

### List authors:

http://localhost:4000/authors

Method: Get

Token Required

### Edit author:

http://localhost:4000/author/[Id]

Method: Put

Token Required
```
Body
{
    "first_name": "Alex",
    "last_name": "Lux"

}
```


### Create book
http://localhost:4000/book

Method: Post

Token Required
```
Body:
{
    "ISBN": "B493834890348349",
    "name": "How to become a programer",
    "author": "615t1e89b2107e172ccf943"
}
```

### List books:

http://localhost:4000/books

Method: Get

Token Required

### Edit book:

http://localhost:4000/book/[Id]

Method: Put

Token Required
```
Body
{
    "code": "B493834890348349",
    "name": "How to become a programer part2",
    "author": "521t1e89b2107e172aaf943"

}
```
 
