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
advertSchema.statics.install=function(){
   adverts=require("../ext/Adverts.js");
        adverts.forEach(function(elem){
            console.log("*");
            advertU=new Advert(elem);
            advertU.save();
        });



};
advertSchema.statics.lista=function(criterios,sort,start,limit,callback){
    var query=Advert.find(criterios);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);

    query.exec(function(err,rows){
        if(err)
            return callback(err);
        return callback(null,rows);
    });
};
//instancia


//Exportar

var Advert=mongoose.model('Advert',advertSchema);

module.exports = Advert;