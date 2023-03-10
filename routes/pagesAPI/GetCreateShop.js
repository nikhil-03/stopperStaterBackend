var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var SQL =require('../../connection/sql')
const bcryptjs=require('bcryptjs');
/* GET home page. */



router.get('/', function(req, res, next) {
  const query="select * from Shops";
        SQL.executeQuery(query)
        .then(()=>{
        console.log("server data");
        var res_str = JSON.stringify(SQL.result);
        res.send(res_str);
       });
     console.log(req.user);  
  
});

router.post('/',async function(req,res){
        const id=req.body.id;
        const email=   req.body.email;
       //  const password=req.body.password;
       const password=await bcryptjs.hash(req.body.password,10);
        const name=req.body.name;
        const address=req.body.address;
        const lat=req.body.lat;
        const long=req.body.long;
        const nameofplace=req.body.nameofplace;
        const mobileno=req.body.mobile;
        const pincode=req.body.pincode;
        const district=req.body.district;
        const state=req.body.state;
        console.log(password);
       //  id	name	address	rating	image	timing	opencloseday	mobileno	whatsappno	latlong	pincode	lat	long	nameofplace	district	state
         const query=`INSERT INTO shops (shopid,name, address, lat,long ,nameofplace,mobileno,pincode,district,state,email,password) VALUES ('${id}','${name}', '${address}', '${lat}','${long}','${nameofplace}','${mobileno}','${pincode}','${district}','${state}','${email}','${password}')`;
        SQL.executeQuery(query)
        .then(()=>{
        var res_str = JSON.stringify(SQL.result);
        res.send(res_str);
       })
       .catch((err)=>{
        res.send(err)
       })
       // console.log(password);
       // res.send("Hey");
})




module.exports = router;
