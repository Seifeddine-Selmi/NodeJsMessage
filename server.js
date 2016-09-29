/**
 * Created by SEIF on 2016-09-26.
 */

var app = require("express")();
var express = require("express");

var bodyParser = require('body-parser');
var session = require('express-session');

var connection = require('./config/db');

var moment = require("./config/moment");


// Moteur de template
app.set('view engine', 'ejs'); // On définit le moteur de template qui va étre utilisé
//app.set('view engine', 'jade');

// Middleware
app.use('/assets', express.static('public')); // assets pour migrer vers un CDN ça serait plus simple. Dossier public contient les fichiers statiques css
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(session({             //https://github.com/expressjs/session
    secret: 'abcdef', //keyboard cat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true if https
}));

app.use(require('./middlewares/flash'));

// Routes
app.get('/', function(req, res){

    connection.query('SELECT * FROM messages', function(err, rows) {
        if (err) throw err;

        res.render('pages/index', {messages : rows, moment: moment});

    });

});

app.post('/', function(req, res){
    // Traitement des données
    if (req.body.message === undefined || req.body.message === '' ) {
        req.flash('error', "Il ya une erreur"); // Gérer les erruers avec flash
        res.redirect('/');
    }else{

        // Use module
         var message = require("./models/message");
        message.create(req.body.message);
            req.flash('success', "Merci!");
            res.redirect('/');
    }

});

app.get('/message/:id', function(req, res){
    connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [req.params.id], function(err, rows) {
        if (err) throw err;

        res.render('messages/show', {message : rows[0], moment: moment});
    });
});

app.listen(8081);
