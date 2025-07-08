const express=require("express");
const session=require("express-session");
const flash = require('connect-flash');
const passport=require('passport');
const localStrategy=require('passport-local');
const app=express();
const mongoose=require("mongoose");
const methodOverride = require('method-override')
const path=require("path");
app.set("view engine",'ejs');
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
let port=5555;
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "/public")));
app.listen(port,(req,res)=>{
    console.log(`Server Connected!! Port NO:${5555}`);});
const User = require("./models/user.js");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const sessionOption={
    secret:"jailogic",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,}
    };
app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser = req.user;
    next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const mongo_url="mongodb://127.0.0.1:27017/Hotel";
main()
.then(m=>console.log("Database connected"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect( mongo_url)};
//=======Routings========//
app.use("/",userRouter); 
app.use("/listings",listingRouter); 
app.use("/listings/:id/reviews",reviewRouter);
  
//=======Error Handling=======//
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message});
});