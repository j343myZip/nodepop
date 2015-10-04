/**
 * Created by jhernandez on 4/10/15.
 */
/**
 * Created by jhernandez on 1/10/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var Error = require("../../lib/error.js");
var Users = require('../../models/Users');
var PushToken = require('../../models/PushToken');
var jwt = require("jsonwebtoken");
var sha1 = require("../../lib/sha1Pass.js");
router.post("/authenticate",function(req,res,next){

    var email=req.body.email || "";
    var password=req.body.password || "";
    var pushtoken=req.body.pushtoken || "";
    var found=Users.find({email:email,password:sha1.convert(password)}).exec(function(err,data){
            if(err) {
                Error.authenticateQuery(res,req);
            }
            else if(data.length==1){
                var tokenJWT=jwt.sign(data[0],"secretkeynodepop",{
                    expiresInMinutes:60*24*2
                });
                if(pushtoken)
                {
                    var id=data[0]._id;

                    PushToken.update({user: id }, { $set: { token: pushtoken, platform: req.platformDevice }}, function(err,data){
                        if(data.nModified==0){
                            var push=new PushToken({user:id,platform:req.platformDevice,token:pushtoken});
                            push.save();
                        }
                    });
                    //TO-DO Save puschCode
                }
                res.json({ok:true,token:tokenJWT});

            }
            else{
                console.log(data.length);
                Error.authenticate(res,req);
            }

    });
});
router.post("/register",function(req,res,next) {
    var email=req.body.email || "";
    var password=req.body.password || "";
    var name=req.body.name;
    var pushtoken=req.body.pushtoken || "";
    if(email==""||password==""||name=="")
        Error.dataMissing(res,req);
    else{
        var found=Users.find({email:email,password:sha1.convert(password)}).exec(function(err,data){


                if(data.length==0) {
                    Users.save({email: email, password: sha1.convert(password), name: name},
                        function (err, data) {
                            Error.createUser(req, res);
                        },
                        function (err, data) {

                            var tokenJWT = jwt.sign(data, "secretkeynodepop", {
                                expiresInMinutes: 60 * 24 * 2
                            });
                            if (pushtoken) {
                                var id = data._id;
                                var push = new PushToken({user: id, platform: req.platformDevice, token: pushtoken});
                                push.save();
                                //TO-DO Save puschCode
                            }
                            res.json({ok: true, token: tokenJWT});
                        });
                }
                else{
                    Error.userExist(res,req);
                }
        });

    }
});
    module.exports=router;