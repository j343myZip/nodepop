/**
 * Created by jhernandez on 30/9/15.
 */
var db=require("../lib/mongdb.js");
var mongoose =require("mongoose");
var PushToken=require("./PushToken.js");
var sha1=require("../lib/sha1Pass.js");
//define schema of advert

var userSchema = mongoose.Schema({
    name: String,
    email: {type:String, index: true},
    password: {type:String, index: true}
});
//estatico
userSchema.statics.install=function(){
    users=require("../ext/Users.js");
    users.forEach(function(elem){
        console.log("*");
        usersU=new User(elem);
        usersU.save(function(err,creado){
            console.log(creado._id);
            var push=new PushToken({user:creado._id});
            push.save();
        });
    });
};
userSchema.statics.save=function(user,errcallback,callback){

    var user = new User(user);
    user.save(function(err,creado){
        if(err){
            return errcallback(err,null);
        }

        var push=new PushToken({user:creado._id});
        user.save();
        return callback(null,creado);

    });

};
var User=mongoose.model('User',userSchema);

module.exports = User;