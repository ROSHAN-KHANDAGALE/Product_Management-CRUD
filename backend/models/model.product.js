/*
 * Importing Mongoose package
 */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productCompany: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

/*
 * Inserting the Schema related information in the userDetails collection.
 */
const product = mongoose.model("productDetails", productSchema);

/**
 * Exporting the Mongoose Schema into the User for reference in the other files
 */
module.exports = product;
