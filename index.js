// run "npm install . "

// Install monodb
const MongoClient = require('mongodb').MongoClient;

const ID= '???';
const PASSWORD = '???';
const DATABASE = 'todoapp';
const NET = '???';

const URL = `mongodb+srv://${ID}:${PASSWORD}@${NET}/${DATABASE}?retryWrites=true&w=majority`

var db;
MongoClient.connect(URL, { useUnifiedTopology: true }, function (error, client) {
    if (error) return console.log(error)
    db = client.db('todoapp');
});

// Install express
const express = require('express');
const app = express();
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.urlencoded({extended: true})) 

// callback functions

app.listen(5500, function() {
    console.log('listening on 5500')
});

app.get('/', function(req, resp) { 
    resp.sendFile(__dirname +'/write.html')
});

app.post('/add', function(req, resp) {
    // body-parser parses the user's request (req) and stores the results
    // int he req.body
    // so req.body.title has the form's title and req.body.date has form's date
    // in /write.html <input type="text" class="form-control" name="title"/>
    // and <input type="text" class="form-control" name="date"/>
    console.log(req.body);
    resp.send('Sent');
    db.collection('post').insertOne( { title : req.body.title, date : req.body.date } , function(){
        console.log('Stored to Mongodb OK')
    });
});