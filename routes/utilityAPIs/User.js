var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var SQL =require('../../connection/sql')
/* GET home page. */



router.get('/', function(req, res, next) {
  const query="select * from Shops";
        SQL.executeQuery(query)
        .then(()=>{
        console.log("server data");
        var res_str = JSON.stringify(SQL.result);
        res.send(res_str);
       });
  
});

router.post('/',function(req,res){
    console.log("Add user hitted");
    console.log(req.body);
        const id=req.body.id;
        const username=req.body.username;
        const password=req.body.password;
        const type=req.body.type;
 
        const query=`INSERT INTO users (id,username, password, type ) VALUES ('${id}','${username}', '${password}', '${type}')`;
        SQL.executeQuery(query)
        .then(()=>{
        var res_str = JSON.stringify(SQL.result);
        res.send(res_str);
       })
       .catch((err)=>{
        res.send(err)
       })
    res.send(req.body)
})




module.exports = router;
