/**
 * Created by jhernandez on 1/10/15.
 */
var sha1=require('../lib/sha1Pass.js');
var users=[{
    "name": "root",
    "email": "root@root.com",
    "password": sha1.convert("toor")
},{
    "name": "user",
    "email": "user@user.com",
    "password": sha1.convert("resu")
}];
module.exports=users;