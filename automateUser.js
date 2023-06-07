require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Omar",
		"lastName": "Metlej",
		"username": "OmarMTJ",
		"password": "password",
		"email": "omarmtj1304@gmail.com",
		"dob": "1984-10-11",
		"phone": "70597024",
		"type": "reader"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


