const mongo=require("mongoose");
const Schema=mongo.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
const User=new Schema({
    email:{
        type:String,
        require:true
    },
});
User.plugin(passportLocalMongoose);

module.exports = mongo.model('User', User);