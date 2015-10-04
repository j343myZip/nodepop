var advert=require("../models/Advert.js");
var user=require("../models/Users.js");
var mongoose =require("mongoose");

mongoose.connection.collections['adverts'].drop( function(err) {
    advert.install();
});
mongoose.connection.collections['users'].drop( function(err) {
    user.install();
});

