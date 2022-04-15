// run "npm install . "

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');

app.listen(5500, function() {
    console.log('listening on 5500')
});

app.get('/', function(req, resp) { 
    resp.sendFile(__dirname +'/write.html')
});

app.get('/list', function(req, resp){
    resp.render('list0.ejs', {
      title: 'hello',
      date: 'today'
    })
})