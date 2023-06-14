require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Charbel",
		"lastName": "Abi Saad",
		"username": "charbel",
		"password": "Charbel123!",
		"email": "charbel182002@gmail.com",
		"dob": "2002-12-18",
		"phone": "70986274",
		"type": "reader"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


