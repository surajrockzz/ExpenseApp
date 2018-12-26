var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var mysql      = require('mysql');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expenses'
});
connection.connect();
app.use(bodyParser.json())
app.use('/views', express.static(__dirname + '/views'))
app.use('/assests',express.static(__dirname+'/assests'));
app.use('/controllers',express.static(__dirname+'/controllers'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
})
app.post("/login", function (req, res) {
   
    var query = "SELECT * FROM users_table where username='" + req.body.username + "'"
    connection.query(query, function (error, results) {
        if (error)
            throw error;
        else {
            var comp = bcrypt.compareSync(req.body.pass, results[0].password);
            console.log(req.body)
            if (comp) {
                token = jwt.sign({
                    username: req.body.username
                }, "snuerearaj", {
                    algorithm: 'HS256'
                });
                res.status(200).json(token);
            } else {
                res.status(400).send("wrong password");
            }
        }
    })

})

app.post("/user", function (req, res) {
     console.log(req.headers.token);
     var decoded = jwt.verify(req.headers.token, "snuerearaj");
    if (decoded&&req.headers.token != null && req.headers.token != undefined) {
        var number = parseInt(req.body.pri, 10);
        // var sql = "select * from store_expense";
        var sql = "INSERT INTO store_expense(userid,type,description,price) VALUES ('" + decoded.username + "','" + req.body.types + "','" + req.body.descr + "','" + number + "')";
        connection.query(sql, function (error, results) {
            if (error) throw error;
            console.log('The solution is: ', results);
        });
    } else {
        res.redirect("/login.html");
    }
})

app.post("/query", function (req, res) {
    if (req.body.token == token) {
        var query = "SELECT type,sum(price) as price FROM `store_expense` WHERE userid=" + "'users' GROUP BY type"
        var response = req.body;
        var suraj = function (results) {
            for (var i = 0; i < results.length; i++) {
                response[results[i].type] = results[i].price + "";
                console.log(response[results[i].type]);
            }
            return new Promise(function (resolve, reject) {
                resolve(response)
            })
        }
        connection.query(query, function (error, results) {
            if (error) throw error;
            var promise = suraj(results);
            promise.then(function () {
                console.log(response);
                res.status(200).json(response);
            })

        })
    } else {
        res.status(400).json("session expired");
    }

})

app.post("/register", function (req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.pass, salt);
    var sql = "INSERT INTO users_table(username,password) VALUES ('" + req.body.username + "','" + hash + "')";
    connection.query(sql, function (error, result) {
        if (error) throw error;
        console.log("inserted in the db");
    });
    res.status(200).json({
        "name": "inserted succ3sfully"
    });
})

app.listen(7040, () => {
    console.log("server is running on port 7040");
});
