const express =require("express");
const router=express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapasync = require("../util/wrapasync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../util/expressError.js");
  //=====server side schema validation handling=====//
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
  };
router.post("/",validateReview,wrapasync(async (req,res)=>{
      let {id}=req.params;
      console.log(id);
      const listing =await Listing.findById(id);
      let newReview= new Review(req.body.review);
      listing.review.push(newReview);
      await newReview.save();
      await listing.save();
      req.flash("success","Successfully new rewiew added.");
      res.redirect(`/listings/${listing.id}`);
  }));
router.delete("/:rvid",wrapasync(async (req,res)=>{
      let {id,rvid}=req.params;
      await Review.findByIdAndDelete(rvid);
      await Listing.findByIdAndUpdate(id, {$pull: {reviews: rvid}})
      req.flash("success","review got deleted");
      res.redirect(`/listings/${id}`);
  }));
  module.exports=router;