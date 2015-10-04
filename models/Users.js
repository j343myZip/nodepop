/**
 * Created by jhernandez on 30/9/15.
 */
var db=require("../lib/mongdb.js");
var mongoose =require("mongoose");
//define schema of advert

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//estatico
userSchema.statics.install=function(){
    users=require("../ext/Users.js");
    users.forEach(function(elem){
        console.log("*");
        usersU=new User(elem);
        usersU.save();
    });
};
userSchema.statics.save=function(user,errcallback,callback){

    var user = new User(user);
    user.save(function(err,creado){
        if(err){
            return errcallback(err,null);
        }
        return callback(null,creado);

    });

};
var User=mongoose.model('User',userSchema);

module.exports = User;