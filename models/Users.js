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
userSchema.statics.save=function(){
    users=require("../ext/Users.js");
    users.forEach(function(elem){
        console.log("*");
        usersU=new User(elem);
        usersU.save();
    });



};
//instancia


//Exportar

var User=mongoose.model('User',userSchema);

module.exports = User;