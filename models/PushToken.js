/**
 * Created by jhernandez on 30/9/15.
 */
var db=require("../lib/mongdb.js");
var mongoose =require("mongoose");
//define schema of advert

var pushTokenSchema = mongoose.Schema({
    platform: {type: String, enum: ['ios', 'android']},
    token: String,
    user: String
});
//estatico
pushTokenSchema.statics.save=function(pushToken,errcallback,callback){

    var pushToken = new PushToken(pushToken);
    pushToken.save(function(err,creado){
        if(err){
            return errcallback(err,null);
        }
        return callback(null,creado);

    });

};

var PushToken=mongoose.model('PushToken',userSchema);

module.exports = PushToken;