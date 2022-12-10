var ObjectId = require("mongodb").ObjectId;

const ProductVariation = require("../../../models/Vendor/Product/Products_variations");
const VariationOption = require("../../../models/Vendor/Product/Product_variations_options");
const Product_variations_options = require("../../../models/Vendor/Product/Product_variations_options");
const { isValidID, newTime } = require("../../../utils");
const Rating = require("../../../models/Vendor/Product/Rating");
const Discount = require("../../../models/Vendor/Product/Discount");

module.exports = {
  // Product variation
  async productVariations(req, res) {
    let { product_id, variation_img } = req.body;

    const newVariation = new ProductVariation({
      product_id,
      variation_img,
    });

    const variation = await newVariation.save();

    res.status(200).json({
      message: "Product variants saved successfully",
      variation,
    });
  },
  // get Product variants
  async getVariants(req, res) {
    const { product_id } = req.params;

    const isvalid = isValidID({ product_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "product_id is not a valid ID",
      });
    }

    const variants = await ProductVariation.findOne({ product_id });

    res.status(200).json({
      variants,
    });
  },

  // get single variation
  async getvariation(req, res) {
    const { product_id } = req.params;

    const variation = await ProductVariation.findOne({ product_id });

    const totalRating = await Rating.aggregate([
      {
        $match: {
          product_id: ObjectId(product_id),
        },
      },
      {
        $group: {
          _id: null,
          total_rating: {
            $sum: "$rating",
          },
        },
      },
    ]);

    const discount = await Discount.findOne({ product_id });

    res.status(200).json({
      variation,
      totalRating: totalRating.length > 0 ? totalRating[0].total_rating : null,
      discount,
    });
  },
  // Remove variants
  async removeVariation(req, res) {
    const { variation_id } = req.body;

    const isvalid = isValidID({ product_id: variation_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Variation id must be valid!",
      });
    }

    const removedVariation = await ProductVariation.findByIdAndDelete({
      _id: variation_id,
    });

    const removedVariationOptions =
      await Product_variations_options.findOneAndDelete({
        product_variations_id: variation_id,
      });

    return res.status(200).json({
      message: "Product variant deleted!",
      removedVariation,
      removedVariationOptions,
    });
  },
  // Product variants options
  async productVariationsOptions(req, res) {
    const { product_id, product_variations_id, variation_type, value, price } =
      req.body;

    const variationOption = new VariationOption({
      product_id,
      product_variations_id: product_variations_id,
      variation_type,
      value,
      price,
    });

    const createdOption = await variationOption.save();
    res.status(200).json({
      message: "Variation option successfully created",
      createdOption,
    });
  },
  // Get product variants options
  async getOptions(req, res) {
    const { variation_id } = req.params;
    const isvalid = isValidID({ product_id: variation_id });

    if (!isvalid) {
      return res.status(400).json({
        message: "variation_id is not a valid ID",
      });
    }

    const options = await VariationOption.find({
      product_variations_id: variation_id,
    });

    res.status(200).json({
      options,
    });
  },

  // Delete product variation option
  async deleteOption(req, res) {
    const { option_id } = req.params;

    const isvalid = isValidID({ product_id: option_id });

    if (!isvalid) {
      return res.status(400).json({
        message: "option_id is not a valid ID",
      });
    }

    const deletedOption = await VariationOption.findOneAndDelete({
      _id: option_id,
    });

    res.status(200).json({
      message: "Product variation option successfully deleted",
      deletedOption,
    });
  },
};
