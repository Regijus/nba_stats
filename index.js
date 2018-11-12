const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoClient = require('mongodb').MongoClient;

const app = express();


// Bodyparser Middleware
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').databaseURI;

mongoClient.connect(db, { useNewUrlParser: true });

// Use Routes

// Port Config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
