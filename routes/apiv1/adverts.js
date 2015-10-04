/**
 * Created by jhernandez on 1/10/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var Advert = require('../../models/Advert');
var Error = require("../../lib/error.js");
router.get("/",function(req,res,next){
    /*Advert.lista({},function(err,lista){
        if(err){
            console.log(err);
            // return next(err);
            res.json({ok:false,err:err});
        }
        //devolver una confirmacion
        res.json({ok:true,advert:lista});
    }); */
    var condition   =   {};
    var tag     =   req.query.tag || "";
    var sale    =   req.query.sale || "";
    var sort    =   req.query.sort || "";
    var name    =   req.query.name || "";
    var price   =   req.query.price || "";
    var start   =   req.query.start || 0;
    var limit   =   req.query.limit || 5;
    if(tag)
        condition.tags=tag;
    if(sale)
        condition.sale=sale;
    if(name)
        condition.name=new RegExp('^' + name, "i");
    if(price){
            price=price.split("-");
            var  price1=price[0];
            var  price2=price[1];
        if(price1&&price2)
            condition.price={ '$gte': price1, '$lte': price2 };
        else if(price1)
            condition.price={'$gte': price1};
        else if(price2)
            condition.price={'$lte': price2};
    }

    console.log(condition);
    Advert.lista(condition,sort,start,limit,function(err,lista){
        if(err){
            console.log(err);
            // return next(err);
            res.json({ok:false,err:err});
        }
        //devolver una confirmacion
        res.json({ok:true,advert:lista});
    })
});
router.get("/tags",function(reg,res,next){
    Advert.find().distinct('tags', function (err, tags){
        if(err) {
            Error.getTags(req,res);
            return;
        } else {
            res.json({ok:true, tags: tags})
            return;
        }


    });
});
module.exports=router;