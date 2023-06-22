require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Joe",
		"lastName": "Youssef",
		"username": "joeyoussef",
		"password": "Joe123!",
		"email": "jyoussef@gmail.com",
		"dob": "2001-04-04",
		"phone": "71687456",
		"type": "reader"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


