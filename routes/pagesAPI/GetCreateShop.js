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
        const name=req.body.name;
        const address=req.body.address;
        const lat=req.body.lat;
        const long=req.body.long;
        const nameofplace=req.body.nameofplace;
        const mobileno=req.body.mobile;
        const pincode=req.body.pincode;
        const district=req.body.district;
        const state=req.body.state;
        //id	name	address	rating	image	timing	opencloseday	mobileno	whatsappno	latlong	pincode	lat	long	nameofplace	district	state
         const query=`INSERT INTO shops (id,name, address, lat,long ,nameofplace,mobileno,pincode,district,state) VALUES (${Math.floor(Math.random() * 100)},'${name}', '${address}', '${lat}','${long}','${nameofplace}','${mobileno}','${pincode}','${district}','${state}')`;
        SQL.executeQuery(query)
        .then(()=>{
        var res_str = JSON.stringify(SQL.result);
        res.send(res_str);
       })
       .catch((err)=>{
        res.send(err)
       })
})




module.exports = router;
