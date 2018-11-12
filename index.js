const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// DB Config
const url = require('./config/keys').databaseURI;
let db;

mongoClient.connect(url, (err, database) => {
	if (err) throw err;
	db = database.db('nba-stats');
	db.createCollection('users', (err, res) => {
		if (err) throw err;
		console.log('Collection created!');
	});
});

// Use Routes
app.post('/users', ({ body: { password, ...fields }}, res) => {
	db.collection('users').insertOne({ ...fields, password: bcrypt.hashSync(password, 10)}, err => {
		if (err) throw err;
		res.status(201).json('Registration successful');
	})
});

app.get('/users', (req, res) => {
	db.collection('users').find().toArray((err, results) => {
		console.log(results);
	})
});

// Port Config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
