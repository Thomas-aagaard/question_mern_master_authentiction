/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');  // We need the mongoose library
const path = require('path');
const checkJwt = require('express-jwt'); // Validates access tokens automatically

/**** Configuration ****/
//const appName = "api"; // Change the name of your server app!
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React

/* Database */
const questionDB = require('./question_db')(mongoose);


// Open paths that do not need login. Any route not included here is protected!
let openPaths = [
    { url: '/api/users/authenticate', methods: ['POST'] }
];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = process.env.SECRET || "the cake is a lie";
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
        res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
        next(); // If no errors, forward request to next middleware or route
    }
});
/**** Routes ****/

app.get('/:id', async (req, res) => {
    let id = req.params.id;
    const ques = await questionDB.getQuestion(id);
    await res.json(ques);
    console.log(ques);
});



// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

app.get('/', async (req, res) => {
    const ques = await questionDB.getData();
    await res.json(ques);
    const questionRouter = require('./routers/question_router')(ques);
    app.use('/api/questions', questionRouter);
});


const usersRouter = require('./routers/users_router')(secret);
app.use('/api/users', usersRouter);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {

      await questionDB.bootstrap(); // Fill in test data if mongoose database is empty.
      await app.listen(port); // Start the API
      console.log(`Question API running on port ${port}!`);
    })
    .catch(error => console.error(error));

