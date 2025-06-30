const express=require("express"); 
const Listing = require("../models/listing.js");
const wrapasync = require("../util/wrapasync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../util/expressError.js")
const router=express.Router({mergeParams:true});
  //=====server side schema validation handling=====//
  const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
  };
router.get("/",wrapasync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));
router.get("/:id/edit",wrapasync(async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does not exist with this id")
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));
router.put("/:id",wrapasync( async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated.");
    res.redirect("/listings");
}));
router.get("/new",wrapasync(async (req,res)=>{
    
    res.render("listings/new.ejs"); 
}));
router.post("/",validateListing,
    wrapasync(async (req,res,next)=>{
    const data=new Listing(req.body.listing);
    await data.save();
    console.log("new list saved.")
    req.flash("success","Successfully new Listing added.");
    res.redirect("/listings");
}));
router.get("/:id",wrapasync(async (req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id).populate("review");
    if(!listings){
        req.flash("error","No Listing Exist with this id");
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing:listings});
}));
router.delete("/:id",wrapasync(async (req,res)=>{
    let {id}=req.params;
     const listing = await Listing.findById(id);
    //  if (listing) {
    //     await Review.deleteMany({ _id: { $in: listing.review } });
    //     await listing.deleteOne(); // deletes listing
    // }
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}));
module.exports=router;