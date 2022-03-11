require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Zeina",
		"lastName": "Zada",
		"username": "jan",
		"password": "Test1234!",
		"email": "zeinazada@yahoo.com",
		"dob": "1984-10-11",
		"phone": "78906469",
		"type": "admin"
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


