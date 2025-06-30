const express =require("express");
const router=express.Router( );
const User=require("../models/user")
const wrapasync=require("../util/wrapasync");
const passport = require("passport");
router.get("/",wrapasync(async(req,res)=>{
    res.render('../views/user/signup.ejs');

}));
router.post("/signup",wrapasync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
    let userdata= new User({
        username,email
    });
    let savedata= await User.register(userdata,password);
    console.log(savedata);
    req.flash("success","Welcome to Jai Logic Hotels");
    res.redirect("/listings");
    }
    catch(errr){
        req.flash("error",errr.message);
        res.redirect("/");
    }

}));
router.get("/signin",wrapasync(async(req,res)=>{
    res.render("../views/user/signin.ejs");
    }
));
router.post("/signin",passport.authenticate("local",{failureRedirect:"/signin",failureFlash:true}),wrapasync(async(req,res)=>{
    req.flash("success","Welcome to Jai Logic Hotels");
    res.redirect("/listings");
    }
));

module.exports=router;