// nodemon ./index.js
// Access this server with http://localhost:5500/

// establish server port
const port = 5500;

// set up and connect to mongo DB client
const MongoClient = require('mongodb').MongoClient;

// URL parts
const ID = 'browserMan';
const PASSWORD = 'TXabiw8QTNpgjExJ';
const DATABASE = 'todoapp';
const NET = 'asecourses.lzeux.mongodb.net';

const URL = `mongodb+srv://${ID}:${PASSWORD}@${NET}/${DATABASE}?retryWrites=true&w=majority`

// access database and set up object for reference
var db;
MongoClient.connect(URL, { useUnifiedTopology: true }, function(error, client) {
    if (error) return console.log(error)
    db = client.db('todoapp');
});

// require all npm packages
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();

// for request parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required for viewing
app.use(express.urlencoded({ extended: true })); // enable extended urls
app.set('view engine', 'ejs'); // render ejs
app.use('/public', express.static('public')); // use public for data access
app.use(methodOverride('_method'));

// start server
app.listen(port, function() {
    console.log(`listening on ${port}`)
});

// DOOR [ / ]
//* GET
app.get('/', function(req, resp) {
    resp.redirect("./tasks")
});

// DOOR [ /write ]
//* GET
app.get('/write', function(req, resp) {
    resp.render('write.ejs');
});

// DOOR [ /tasks ]
//* GET
//- GET POST DELETE PUT
app.get('/tasks', function(req, resp) {
    db.collection('post').find().toArray(function(error, res) {
        resp.render('list.ejs', { posts: res });
    });
});

// API [ /tasks ]
//* POST
app.post('/tasks', function(req, resp) {
    // check for empty body
    // TODO figure out why this doesn't work with empty objects
    if (req.body == {} || req.body == "{}") {
        // send error response
        resp.status(400);
        resp.send("Bad Request");
    } else {
        db.collection('counter').findOne({ name: 'Total Post' }, function(countError, countRes) {
            // get and store total post count
            var totalPost = countRes.totalPost;

            //generate the post entry for logging
            let postEntry = {
                _id: totalPost + 1,
                title: req.body.title,
                date: req.body.date,
                description: req.body.description
            };

            db.collection('post').insertOne(postEntry, function(postError, postRes) { // add post to data base
                if (postError) { return console.log(postError) } // if error, return error

                db.collection('counter').updateOne({ name: 'Total Post' }, { $inc: { totalPost: 1 } }, function(incError, incRes) { // increment counter
                    // if there's a problem, log it
                    if (incError) { return console.log(incError) }

                    // Log updated data
                    console.log("Data that was logged: ");
                    console.log(req.body);

                    // generate response
                    resp.redirect(301, "/tasks");
                });
            });
        });
    }
});

// API [ /tasks ]
//* DELETE
app.delete('/tasks', function(req, resp) {
    req.body._id = parseInt(req.body._id); // the body._id is stored in string, so change it into an int value
    console.log(req.body._id);

    db.collection('post').deleteOne(req.body, function(error, res) {
        console.log('Delete complete');

        resp.status(200);
        resp.send("Successfully Deleted");
    });
});

// API [ /tasks ]
//* PUT
// TODO
// Updates a current existing task
// can be used to mark as complete 
app.put('/tasks', function(req, resp) {
    db.collection('post').updateOne({ _id: parseInt(req.body.id) }, {
        $set: {
            title: req.body.title,
            date: req.body.date,
            desc: req.body.date
        }
    }, function() {
        console.log('app.put.edit: Update complete');
        resp.redirect('/tasks');
    });
});

// DOOR [ /tasks/:id ]
//* GET
// TODO
app.get('/tasks/:id', function(req, resp) {
    // req.params.id contains the value of :d
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function(error, res) {
        if (error) {
            console.log(error);
            resp.status(500).send({ error: 'Error from db.collection().findOne()' })
        } else {
            console.log('app.get.detail: Update complete')
            console.log({ data: res });
            if (res != null) {
                resp.render('detail.ejs', { data: res })
            } else {
                console.log(error);
                resp.status(500).send({ error: 'result is null' })
            }
        }
    })
});

// DOOR [ /edit ]
// API [ /edit ]
//* POST
// TODO
// No clue why this is here unless it's meant to function as a redirectors
app.post('/edit', function(req, resp) {
    console.log(req.body.id)
    resp.redirect(`/edit/${req.body.id}`)
});

// DOOR [ /edit/:id ]
//* GET
// TODO
app.get('/edit/:id', function(req, resp) {
    console.log(req.params)
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function(error, res) {
        if (error) {
            console.log(error);
            resp.status(500).send({ error: 'Error from db.collection().findOne()' })
        } else {
            console.log({ data: res });
            if (res != null) {
                console.log({ data: res })
                resp.render('edit.ejs', { data: res })
            } else {
                console.log(error);
                resp.status(500).send({ error: 'result is null' })
            }
        }
    })
});