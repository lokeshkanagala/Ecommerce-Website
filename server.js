var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app= express();

mongoose.connect('mongodb://root:root@ds045531.mlab.com:45531/ecommerce', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
})

//Middleware
app.use(morgan('dev'));

app.get('/', function(req,res) {
	var name='man';
	res.json("My name is"+name);
});



app.listen(3000, function(err) {
    if (err) throw err;
	console.log("Server is Running");
});