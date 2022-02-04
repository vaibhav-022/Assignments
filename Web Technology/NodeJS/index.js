const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

//Setting up Router
var router= express.Router();
const apiRoot='/api';

app.use(apiRoot,router);
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Database Successfully Connected !');
    else
        console.log('Database connection failed \n Error Occured : ' + JSON.stringify(err, undefined, 2));
});


app.listen(8080, () => console.log('Express server is runnig at port no : 8080'));


//Get all users
app.get('/api/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get a user
router.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete a user
router.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert a user
app.post('/api/users', (req, res) => {
    let usr = req.body;
    var sql = "INSERT into users values(?,?,?,?,?,?,?,?)";
    mysqlConnection.query(sql, [usr.id, usr.name, usr.password, usr.gender, usr.birthdate, usr.age, usr.country, usr.phone], (err, rows, fields) => {
        if (!err)
                res.send('Inserted User Successfully');
        else
            console.log(err);
    })
});

//Update a user
app.put('/api/users/:id', (req, res) => {
    let usr = req.body;
    var sql = "update users SET name = ?, password = ?, age = ? where id=?;";
	console.log(usr.name, usr.password, usr.age, req.params.id);
    mysqlConnection.query(sql, [usr.name, usr.password, usr.age, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});