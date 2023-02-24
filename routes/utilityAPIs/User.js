var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var SQL =require('../../connection/sql')
const bycrypt=require('bcryptjs');
/* GET home page. */



router.get('/', function(req, res) {
//   console.log(req.params);  
// console.log(req.user);
//   const query="select * from Shops";
    //     SQL.executeQuery(query)
    //     .then(()=>{
    //     console.log("server data");
    //     var res_str = JSON.stringify(SQL.result);
    //     res.send(res_str);
    //    });
    // console.log(req.user);
    // res.send("Done");
    // res.send(req.user)
    console.log(req.user);
    res.send(req.user)
  
});

router.post('/', function(req,res){
    console.log("Add user hitted");
    // console.log(req.body);
        // const id=req.body.id;
        const username=req.body.username;
        const password=req.body.password;
        const type=req.body.type;
        // const bcpassword=await bycrypt.hash(password,10);
 
        // const query=`INSERT INTO users (id,username, password, type ) VALUES ('${id}','${username}', '${password}', '${type}')`;
        const query=`select * from shops where email='${username}'`;
        SQL.executeQuery(query)
        .then(()=>{
        var resultUser = SQL.result;
        // res.send(res_str);
        if(resultUser.length===0){
           res.send("You need to create account")
        }else{
        //    console.log(resultUser[0].password+","+password); 
           bycrypt.compare(password,resultUser[0].password,(err,result)=>{
             if(result){
                // console.log(result);
                res.json({Access:true,Details : resultUser})
             }else if(err){
                console.log(err);
             }
             else{
                res.send("You have entered the wrong password")
             }
           })
        }
       })
       .catch((err)=>{
        res.send(err)
       })
    // console.log(req.body.username+"---"+req.body.password)
    // res.send("Some unexpected error happend");
})




module.exports = router;
