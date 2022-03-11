require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Sam",
		"lastName": "ABCD",
		"username": "sam",
		"password": "Test1234!",
		"email": "shineyzeina@gmail.com",
		"dob": "1984-10-11",
		"phone": "78906469",
		"type": "reader"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


