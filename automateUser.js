require('rootpath')();
const express = require('express');
const app = express();


const db = require('_helpers/db');
const User = db.User;
// Create  user.	
const userService = require('./users/user.service');

userService.create(
	{
		"firstName": "Omar2",
		"lastName": "Metlej2",
		"username": "OmarMTJ2",
		"password": "password2",
		"email": "omar.mtj1304@gmail.com",
		"dob": "1985-10-11",
		"phone": "70697024",
		"type": "reader"
		
	}
).
	then(function () {
		console.log("User  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


