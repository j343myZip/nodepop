/**
 * Created by jhernandez on 30/9/15.
 */
var db=require("../lib/mongdb.js");
var mongoose =require("mongoose");
//define schema of advert

var advertSchema = mongoose.Schema({
    name: String,
    sale:  Boolean,
    price: Number,
    foto: String,
    tags:[String]
});
//estatico
advertSchema.statics.save=function(){
   adverts=require("../ext/Adverts.js");
        adverts.forEach(function(elem){
            console.log("*");
            advertU=new Advert(elem);
            advertU.save();
        });



};
//instancia


//Exportar

var Advert=mongoose.model('Advert',advertSchema);

module.exports = Advert;