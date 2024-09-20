const mongoose = require("mongoose");
const modelProduct = require("../models/model.product");
const constants = require("../config/constants");

exports.getProductDetails = async (req, res) => {
  try {
    const getProduct = await modelProduct
      .find()
      .sort({ productName: 1 })
      .limit(10);
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
