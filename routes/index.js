var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var SQL =require('../connection/sql')
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

module.exports = router;




