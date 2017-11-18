var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var secret = require('./config/secret');
var User = require('./models/user');


var app= express();

mongoose.connect(secret.database, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

//Middleware
app.use(express.static(path.join(__dirname+'/public')));
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');

app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);





app.listen(secret.port, function(err) {
    if (err) throw err;
	console.log("Server is Running");
});