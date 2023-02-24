var SQL =require('./connection/sql')
const bycrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
        console.log(username+"------"+password);
        const query=`select * from shops where email='${username}'`;
        SQL.executeQuery(query)
        .then(()=>{
        var resultUser = SQL.result;
        if(resultUser.length===0){
        //    res.send("You need to create account");
           return done(null, false);
        }else{
           bycrypt.compare(password,resultUser[0].password,(err,result)=>{
             if(result){
                return done(null, resultUser);
             }else if(err){
                console.log(err);
                return done(null, false);
             }
           })
        }
       })
     }
    )
  );

  passport.serializeUser((resultUser, cb) => {
    // console.log(resultUser);
    cb(null, resultUser[0].shopid);
  });
  passport.deserializeUser((shopid, cb) => {
    // console.log(shopid);
    // User.findOne({ _id: id }, (err, user) => {
        SQL.executeQuery(`select * from shops where shopid='${shopid}'`)
        .then(()=>{
            // console.log("Im called");
            var resultUser = SQL.result; 
            // console.log(resultUser);    
      const userInformation = {
        
        username: resultUser,
      };
      cb(null, userInformation);
    });
  });
};
   //   User.findOne({ username: username }, (err, user) => {
    //     if (err) throw err;
    //     if (!user) return done(null, false);
    //     bcrypt.compare(password, user.password, (err, result) => {
    //       if (err) throw err;
    //       if (result === true) {
    //         return done(null, user);
    //       } else {
    //         return done(null, false);
    //       }
    //     });
    //   });