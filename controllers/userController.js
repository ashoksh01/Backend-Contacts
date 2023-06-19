const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenSchema = require("../models/tokenModel")

//user registration
const Register = async(req, res) => {
    //changed values

    if( req.body.password !==  req.body.cpassword){
        return res.json("passworn not match")
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
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
};


//User login
const Login = async (req, res, next) => {
    console.log("Hello");
    user.findOne({ email: req.body.email })
        .then((usr) => {
            if (!usr) {
                let err = new Error('404: User credentials found!');
                err.status = 404;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, usr.password)
                    .then(async(isMatch) => {
                        if (!isMatch) {
                            let err = new Error('ERROR: Incorrect Password. Please try again!');
                            err.status = 400;
                            return  res.json(err)
                        }
                        let token = jwt.sign({ id: usr._id}, process.env.JWT_SECRET,{
                            expiresIn: 60 * 24 *24
                          });     
                        const userinfos ={
                            id: usr._id, fullname: usr.fullname, email: usr.email
                            ,contactnum: usr.contactnum,
                            address: usr.address, adminrole: usr.admin, superrole:usr.superadmin
                        }
                        const findToken =  await TokenSchema.findOne({user:usr._id})
                        if(!findToken){
                            await new TokenSchema({
                                user:usr._id,
                                token
                            }).save()
                        }else{
                            findToken.token = token
                            await findToken.save()
                        }
                        res.json({ userStatus: 'User Log In Success!', token: token, logininfo: userinfos });
                    }).catch(next);
            }
        }).catch(e=>res.json(e.message));
};

module.exports = {
    Login ,Register
};



