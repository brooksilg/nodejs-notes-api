const express        = require('express');
const MongoClient    = require('mongodb').MongoClient; // to interact with our db
const bodyParser     = require('body-parser');

const db             = require('./config/db');

// set up app as instance of express
const app            = express();

// specify port to listen on
const port = 8000;

// Use bodyParser to process URL encoded forms
app.use(bodyParser.urlencoded({ extended: true }));

console.log('db.url', db.url);

const mongoConfig = {
    useNewUrlParser: true,
};

MongoClient.connect(db.url, mongoConfig, (err, database) => {
    
    if (err) return console.log(err);

    //   const collection = client.db("test").collection("devices");
    const notesDatabase = database.db("note").collection("tests");
    // perform actions on the collection object

    // require index.js, which handles all routes for the app
    require('./app/routes')(app, notesDatabase);

    app.listen( port, () => { 
        console.log('We are live on ' + port);
    });

});
