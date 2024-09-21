const mongoose = require("mongoose");
const modelProduct = require("../models/model.product");
const constants = require("../config/constants");

exports.getProductDetails = async (req, res) => {
  try {
    const getProduct = await modelProduct.find().sort({ productName: 1 });
    res
      .status(constants.OK)
      .json({ message: constants.RECORD_FOUND, item: getProduct });
  } catch (error) {
    res.status(constants.NOT_FOUND).json({ error: constants.RECORD_NOT_FOUND });
  }
};

exports.getProductDetailsById = async (req, res) => {
  try {
    const getProductById = await modelProduct.findById({ _id: req.params.id });
    res
      .status(constants.OK)
      .json({ message: constants.RECORD_FOUND, item: getProductById });
  } catch (error) {
    res.status(constants.NOT_FOUND).json({ error: constants.RECORD_NOT_FOUND });
  }
};

exports.createProductDetails = async (req, res) => {
  try {
    const newProductRecord = new modelProduct(req.body);
    await newProductRecord.save();
    res
      .status(constants.CREATED)
      .json({ message: constants.REGISTERED, item: newProductRecord });
  } catch (error) {
    res
      .status(constants.BAD_REQUEST)
      .json({ error: constants.REGISTER_FAILED });
  }
};

exports.updateProductDetails = async (req, res) => {
  try {
    const updateProduct = await modelProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateProduct) {
      return res
        .status(constants.NOT_FOUND)
        .json({ error: constants.RECORD_NOT_FOUND });
    }
    res
      .status(constants.OK)
      .json({ message: constants.UPDATED, item: updateProduct });
  } catch (error) {
    res.status(constants.NOT_FOUND).json({ error: constants.UPDATE_FAILED });
  }
};

exports.deleteProductDetails = async (req, res) => {
  try {
    const deleteProduct = await modelProduct.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res
        .status(constants.NOT_FOUND)
        .json({ error: constants.REMOVE_FAIL });
    }
    res
      .status(constants.OK)
      .json({ message: constants.REMOVED, item: deleteProduct });
  } catch (error) {
    res.status(constants.BAD_REQUEST).json({ error: constants.REMOVE_FAIL });
  }
};

exports.getPaginatedProducts = async (req, res) => {
  try {
    // Extract page and limit from query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const products = await modelProduct.find().skip(skip).limit(limit).exec();

    // Get total count of documents for pagination
    const total = await modelProduct.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Return paginated response
    res.json({
      page,
      limit,
      totalPages,
      totalProducts: total,
      products,
    });
  } catch (error) {
    res
      .status(constants.INTERNAL_SERVER_ERROR)
      .json({ message: constants.SERVER_ERROR, error });
  }
};
