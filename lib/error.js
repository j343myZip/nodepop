/**
 * Created by jhernandez on 1/10/15.
 */
var Error={
    authenticateQuery:function(res,req){

    },
    authenticate:function(res,req){
        res.status(401).json({status:"USER_NOT_FOUND"});
    },
    createUser:function(res,req){
        res.status(401).json({status:"CAN'T_CRATE_USER"});
    },
    getTags:function(res,req){
        res.status(401).json({status:"CAN'T_GET_TAGS"});
    }
}
module.exports=Error;