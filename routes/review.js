const express =require("express");
const router=express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapasync = require("../util/wrapasync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../util/expressError.js");
const controller=require("../controller/review.js");
const {validateReview,isReviewAuthor}=require("../views/middleware/middleware")
  //=====server side schema validation handling=====//
router.post("/",validateReview,wrapasync(controller.createReview));
router.delete("/:rvid",isReviewAuthor,wrapasync(controller.destroyReview));
module.exports=router;