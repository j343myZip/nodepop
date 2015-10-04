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
 var jwt = require("jsonwebtoken");
router.post("/authenticate",function(req,res,next){

    var email=req.body.email || "";
    var password=req.body.password || "";
    var token=req.body.pushtoken || "";
    var platform=req.body.platform || "";
    var found=Users.find({email:email,password:password}).exec(function(err,data){
            if(err) {
                Error.authenticateQuery(res,req);
            }
            else if(data.length==1){
                var tokenJWT=jwt.sign(data[0],"clavedeservidorsupersecreta",{
                    expiresInMinutes:60*24*2
                });
                if(token!=""&&platform!="")
                {
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
    if(email==""||password==""||name=="")
        Error.dataMissing(res,req);
    else{
        Users.save({email:email,password:password,name:name},
            function(err,data){
                Error.createUser(req,res);
            },
            function(err,data){

                var tokenJWT=jwt.sign(data,"clavedeservidorsupersecreta",{
                    expiresInMinutes:60*24*2
                });
                res.json({ok:true,token:tokenJWT});
            });

    }
});
    module.exports=router;