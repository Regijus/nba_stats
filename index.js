const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const players = require('./routes/api/players');
const teams = require('./routes/api/teams');
const users = require('./routes/api/users');

const app = express();

// Bodyparser Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// Web DB Config
const webDB = require('./config/keys').webDatabaseURI;
mongoose
    .connect(webDB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected Successfully'))
		.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// Use Routes
app.use('/api/players', players);
app.use('/api/teams', teams);
app.use('/api/users', users);

// Port Config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
