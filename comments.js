//create web server
var express = require('express');
var app = express();
var fs = require("fs");

//use the body-parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use the mysql module
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comments'
});
connection.connect();

//create a GET route
app.get("/comments", function(req, res) {
    connection.query("SELECT * FROM comments", function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//create a POST route
app.post("/comments", function(req, res) {
    console.log(req.body);
    connection.query("INSERT INTO comments (name, comment) VALUES ('" + req.body.name + "', '" + req.body.comment + "')", function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//create a DELETE route
app.delete("/comments", function(req, res) {
    console.log(req.body);
    connection.query("DELETE FROM comments WHERE id = " + req.body.id, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//create a PUT route
app.put("/comments", function(req, res) {
    console.log(req.body);
    connection.query("UPDATE comments SET name = '" + req.body.name + "', comment = '" + req.body.comment + "' WHERE id = " + req.body.id, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//listen to port 3000 by default
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});

