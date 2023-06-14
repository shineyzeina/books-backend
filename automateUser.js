require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Joey",
		"lastName": "Robertson",
		"username": "joeyoussef44",
		"password": "Aspire123$",
		"email": "jyoussef533@gmail.com",
		"dob": "2001-04-04",
		"phone": "71687456",
		"type": "admin"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


