const express=require("express"); 
const Listing = require("../models/listing.js");
const wrapasync = require("../util/wrapasync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../util/expressError.js")
const router=express.Router({mergeParams:true});
const controller=require("../controller/listing.js")
const{isLoggedIn,isOwner,isReviewAuther,validateListing}=require("../views/middleware/middleware");
  //=====server side schema validation handling=====//
router.get("/",wrapasync(controller.index));
router.get("/:id/edit",isOwner,isLoggedIn,wrapasync(controller.editListing));
router.put("/:id",isLoggedIn,isOwner,wrapasync(controller.updateListing));
router.get("/new",isLoggedIn,wrapasync(controller.renderNewForm));
router.post("/",isLoggedIn,validateListing,wrapasync(controller.createListing));
router.get("/:id",wrapasync(controller.showListing));
router.delete("/:id",isLoggedIn,isOwner,wrapasync(controller.deleteListing));
module.exports=router;