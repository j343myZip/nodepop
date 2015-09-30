/**
 * Created by jhernandez on 1/10/15.
 */
"use strict";
var mongoose=require("mongoose");
var db = mongoose.connection;
// handler error de conexión
db.on('error',function(err){
    console.log(err);
    process.exit(1);
});

//handler de conexion
db.once('open',function(){
    console.log("Conectado a MongoDB");
});

mongoose.connect('mongodb://localhost/nodepop');