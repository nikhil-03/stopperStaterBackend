var express = require('express');
var router = express.Router();
var http = require('http');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
   const requ=http.get(`http://www.postalpincode.in/api/pincode/827013`,(response)=>{
    let data = '';

       response.on('data', (chunk) => {
       data += chunk;
     });
     
       response.on('end', () => {
        console.log('Body:', JSON.parse(data))
        res.send(JSON.parse(data))
      });
     
      })
      
});

module.exports = router;
