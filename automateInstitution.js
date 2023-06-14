require('rootpath')();
const express = require('express');
const app = express();
const db = require('_helpers/db');
const Institution = db.Institution;
// Create  user.	
const institutionService = require('./institutions/institution.service');

institutionService.create(
	{
		"name": "Khatibo Alami 2",
		"dateOfCreation": "1985-10-11",
		"contactInfo": {
            "phoneNumber" : "80672550786",
            "email": "khatibo.alami2@gmail.com",
            "website" : "Ramvooo"
        },
        "address": {
            "country" : "Lebanon",
            "city": "Beirut",
            "street" : "al cocodi",
            "building" : "mdtaxi"
        },
        "createdBy": '6478670761de2a59fcde3fae'
		
		
	}
).
	then(function () {
		console.log("Institution  is created");
	}).catch(function (e) {
		console.log("Promise Rejected" + e);
	});;


