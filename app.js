const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./api/config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

//const users = require('./api/routes/usersRoutes');
//const dietSheet = require('./api/routes/dietSheetRoutes');
//const workout = require('./api/routes/workoutsRoutes');
//const trainer = require('./api/routes/trainerRoutes');



// Port Number
const port = 8082;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

//app.use('/fitnessapp/users', users);
//app.use('/fitnessapp/dietSheet', dietSheet);
//app.use('/fitnessapp/workout', workout);
//app.use('/fitnessapp/trainer', trainer);

// Index Route
app.get('/fitnessapp', (req, res) => {
  res.send('Fitness APP is up and running : User correct endpoitn');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
