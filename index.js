// Install package
const MongoClient = require('mongodb').MongoClient;

// Setup 
const ID= '???';
const PASSWORD = '???';
const DATABASE = 'todoapp';
const NET = '???';
const URL = `mongodb+srv://${ID}:${PASSWORD}@${NET}/${DATABASE}?retryWrites=true&w=majority`

// Callback function
var db;
MongoClient.connect(URL, { useUnifiedTopology: true }, function (error, client) {
    if (error) return console.log(error)
    db = client.db('todoapp');
    db.collection('post').insertOne( {name : 'John', _id : 100} , function(error, result){
        console.log('done'); 
    });
});