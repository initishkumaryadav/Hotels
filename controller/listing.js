const Listing = require('../models/listing.js')
module.exports.index=async(req, res) => {
    let allListings = await Listing.find({})
    res.render('listings/index',{allListings})
}

module.exports.renderNewForm=async(req, res) => {
    res.render('listings/new')
}

module.exports.createListing=async(req, res, next) => {   
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash('success', 'New listing created!')//for flash message when create a new listing
    res.redirect('/listings')
}

module.exports.updateListing=async(req, res) => {
    let {id} = req.params;
    const updatedListing = req.body.listing
    let listing=await Listing.findByIdAndUpdate(id, updatedListing)  
    await listing.save()
    res.redirect(`/listings/${id}`)
}

module.exports.editListing=async(req, res) => {
    let id = req.params.id;
    console.log(id);
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash('error', 'Listing not found! or it may be deleted!')
        return res.redirect('/listings')
    }
    res.render('listings/edit', {listing})
}

module.exports.showListing=async(req, res) => {
    let id = req.params.id
    let listing = await Listing.findById(id)
    .populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    })
    .populate('owner')
    if(!listing){
        req.flash('error', 'Listing not found! or it may be deleted!')
        return res.redirect('/listings')
    }
    res.render('../views/listings/show.ejs', {listing})
}

module.exports.deleteListing=async(req, res) => {
    let {id} = req.params;
    let delteData=await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing deleted!')
    res.redirect('/listings')
    console.log(delteData)
}