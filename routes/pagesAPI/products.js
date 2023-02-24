var express = require('express');
var router = express.Router();
var SQL =require('../../connection/sql')
/* GET home page. */



router.get('/', function(req, res, next) {
    
    // const id=req.user.username[0].shopid;
      console.log(req.query.productId);
      const query=`select productcode,productname,productvendor,quantityinstock,buyprice,msrp from myproduct where shopid='${req.query.productId}'`;
        SQL.executeQuery(query)
        .then(()=>{
        var res_str = JSON.stringify(SQL.result);
        
        console.log("server data");
        console.log(query)
        res.send(res_str);
       });
    
    //  console.log(req.user);  
    // console.log(req.user.username[0].shopid);
    // res.send("Connected");
  
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
