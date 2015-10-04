/**
 * Created by jhernandez on 1/10/15.
 */
var lang=require("./lang.js")
var ErrorLib={
    authenticateQuery:function(res,req){
        res.status(500).json({status:lang[req.lang].ERROR_MONGO_DB});
    },
    authenticate:function(res,req){
        res.status(401).json({status:lang[req.lang].USER_NOT_FOUND});
    },
    createUser:function(res,req){
        res.status(401).json({status:lang[req.lang].CANT_CRATE_USER});
    },
    getTags:function(res,req){
        res.status(401).json({status:lang[req.lang].CANT_GET_TAGS});
    },
    invalidToken:function(res,req){
        res.status(401).json({status:lang[req.lang].INVALID_TOKEN});
    },
    dataMissing:function(res,req){
        res.status(401).json({status:lang[req.lang].DATA_MISSING});
    },
    userExist:function(res,req){
        res.status(401).json({status:lang[req.lang].USER_EXIST_YET});
    }
}
module.exports=ErrorLib;