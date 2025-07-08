const mongo=require("mongoose");
const Schema=mongo.Schema;
const Review=require("./review.js")
const User=require("./user.js");
const listingSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    image:{
        filename:{
          type: String,
          default: "listingimage",
        },
        url: {
          type: String,
        },
      },
    price:{
        type:Number,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    description:{
        type:String
    },
    country:{
        type:String,
    },
    review:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}});
    }
});
const Listing=mongo.model("Listing",listingSchema);
module.exports=Listing;