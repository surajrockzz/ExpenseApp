var express = require('express');
var bodyParser = require('body-parser');
var verify = require('./verify.js');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(express.static(__dirname + '/public'));
var mysql      = require('mysql');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'expenses'
});
var token=null;
connection.connect();
app.post("/login",function(req,res){
        var query = "SELECT * FROM users_table where username='"+req.body.username+"'"
        connection.query(query,function(error,results){
            if(error) 
                throw error;
            else{
               var comp =  bcrypt.compareSync(req.body.pass, results[0].password);
               if(comp){
                    token = jwt.sign({username:req.body.username},"snuerearaj",{algorithm:'HS256'});
                    res.set("authorization",token);
                    res.status(200).json(token);
               }
               else{
                    res.status(400).send("wrong password");
               }
            }
        })
        
})

app.post("/user",function(req,res){
    if (username != false) {
        var number = parseInt(req.body.pri, 10);
        // var sql = "select * from store_expense";
        var sql = "INSERT INTO store_expense(userid,type,description,price) VALUES ('"+username+"','"+ req.body.types + "','" + req.body.descr + "','" + number + "')";
        connection.query(sql, function (error, results) {
            if (error) throw error;
            console.log('The solution is: ', results);
        });
    }
    else{
        res.redirect("/login");
    }
})

app.post("/query",function(req,res){
    
   var query ="SELECT type,sum(price) as price FROM `store_expense` WHERE userid="+"'users' GROUP BY type"
    var response = req.body;
    var suraj = function(results){
        for(var i=0;i<results.length;i++){
            response[results[i].type]=results[i].price+"";
            console.log(response[results[i].type]);
        }
        return new Promise(function(resolve,reject){
                resolve(response)    
        })
    }
    connection.query(query,function(error,results){
        if(error) throw error;
        var promise = suraj(results);
        promise.then(function(){
            console.log(response);
            res.status(200).json(response);
        })
        
    })
    
})
app.post("/register",function(req,res){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.pass, salt);
    var sql = "INSERT INTO users_table(username,password) VALUES ('"+req.body.username+"','"+hash + "')";
    connection.query(sql, function (error, result) {
        if (error) throw error;
        console.log("inserted in the db");
    });
    res.status(200).json({"name":"inserted succ3sfully"});
})

app.listen(7040, () => {
    console.log("server is running on port 7040");
});
