const mongoose = require("mongoose");
const initData = require("./data.js"); 
const Listing = require("../models/listing.js");
const mongo_url = "mongodb://127.0.0.1:27017/Hotel";

main()
  .then(() => {
    console.log("Database connected");
    initDB(); 
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  const userId = "686c79ebfd1b1ef8569e4039"; // Replace with the actual user ID
  await Listing.deleteMany({});
  const updatedData = initData.data.map(listing => ({
    ...listing,
    owner: userId
  }));
  await Listing.insertMany(updatedData);
  console.log("Data was initialized with owner field.");
};
