// run "npm install . "

<<<<<<< HEAD
// Install monodb
=======
>>>>>>> c00a9d8 (Version 3.3)
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

<<<<<<< HEAD
// Install express
const express = require('express');
const app = express();
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.urlencoded({extended: true})) 

// callback functions
=======
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');
>>>>>>> c00a9d8 (Version 3.3)

app.listen(5500, function() {
    console.log('listening on 5500')
});

app.get('/', function(req, resp) { 
    resp.sendFile(__dirname +'/write.html')
});

app.post('/add', function(req, resp) {
    console.log(req.body);

    db.collection('counter').findOne({name : 'Total Post'}, function(error, res) {
        var totalPost = res.totalPost
    
        db.collection('post').insertOne({ _id : totalPost + 1, title : req.body.title, date : req.body.date }, function (error, res) {
            if(error){return console.log(error)}
            db.collection('counter').updateOne({name : 'Total Post'},{ $inc: {totalPost:1} },function(error, res){
                if(error){return console.log(error)}
                resp.send('Stored to Mongodb OK');
            })
        })
    })
});

app.get('/list', function(req, resp){
    db.collection('post').find().toArray(function(error, res){
        console.log(res)
        resp.render('list.ejs', { posts: res })
    })
});