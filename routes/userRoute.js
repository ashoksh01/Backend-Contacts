const express = require('express');
const user = require('../models/userModel');
const router = new express.Router;
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');


//user registration
router.post("/user/registration",(req, res) => {
    //changed values
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body);
    user.create(req.body).then(function(){
        console.log("success");
        return res.json({successmsg :"User Account Successfully created"});
        
    }).catch(function(e){
        console.log("error");
      if(e.name === "VALIDATION_ERROR"){
            return res.status(403).json({errmsg: "Email already in use. Try again!"});
        }else{
            res.send(e);
        }
    });
});

//admin user registration
router.post("/admin/registration",(req, res) => {
    //changed values
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    user.create(req.body).then(function(){
        return res.json({successmsg :"Admin created Successfully"});
    }).catch(function(e){
        if(e.name === "ValidationError"){
            return res.status(403).json({message: "Email already in use. Try again!"});
        }else{
            res.send(e);
        }
    });
});

//User login
router.post('/user/login', (req, res, next) => {
    console.log("Hello");
    user.findOne({ email: req.body.email })
        .then((usr) => {
            if (usr == null) {
                let err = new Error('404: User credentials found!');
                err.status = 404;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, usr.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('ERROR: Incorrect Password. Please try again!');
                            err.status = 400;
                            return next(err);
                        }
                        let token = jwt.sign({ id: usr._id}, process.env.SECRET,{
                            expiresIn: 60 * 24 *24
                          });     
                        const userinfos ={
                            id: usr._id, fullname: usr.fullname, email: usr.email
                            ,contactnum: usr.contactnum,
                            address: usr.address, adminrole: usr.admin, superrole:usr.superadmin
                        }
                        res.json({ userStatus: 'User Log In Success!', token: token, logininfo: userinfos });
                    }).catch(next);
            }
        }).catch(next);
});

//Admin login







module.exports = router;



