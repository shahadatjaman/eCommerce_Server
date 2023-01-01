const Product = require("../../../models/Vendor/Product/Product");
const { newTime, objectId, isValidID, escape } = require("../../../utils");
const Categories = require("../../../models/Vendor/Product/Categories");
const Tag = require("../../../models/Vendor/Product/Tag");
const ShareLinks = require("../../../models/Vendor/Product/Share_link");
const ProductVariation = require("../../../models/Vendor/Product/Products_variations");
const VariationOption = require("../../../models/Vendor/Product/Product_variations_options");
const Product_variations_options = require("../../../models/Vendor/Product/Product_variations_options");
const Discount = require("../../../models/Vendor/Product/Discount");
const ProductInventory = require("../../../models/Vendor/Product/Product_inventory");
const Rating = require("../../../models/Vendor/Product/Rating");
const cloudinary = require("../../../utils/cloudinaryConfg");

const { serverError, clientError } = require("../../../utils/error");

module.exports = {
  // Create initial product
  async createEmptyProduct(req, res) {
    const { _id } = req.user;

    await Product.findOneAndDelete({ isValid: false });

    const newProduct = new Product({
      user_id: _id,
      name: "_",
      price: 0.0,
      short_desc: "_",
      long_desc: "_",
      product_status: "_",
      product_type: "_",
      SKU: "_",
      tot_rating: 0,
      category_id: "_",
      sub_category_id: "_",
      isValid: false,
      createdAt: newTime(),
      updatedAt: newTime(),
    });

    let product = await newProduct.save();

    return res.status(200).json({
      message: "Product saved successfully",
      product,
    });
  },
  // New Product creation
  async createProduct(req, res) {
    const { product_id } = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: product_id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Product saved successfully",
      product,
    });
  },

  // Create share link
  async createShareLink(req, res) {
    let { product_id, icon_name, url } = req.body;

    const newShareLink = new ShareLinks({
      product_id,
      icon_name,
      url,
    });

    let sharelink = await newShareLink.save();

    res.status(200).json({
      message: "Share link successfully created",
      sharelink,
    });
  },

  // Delete Oparation
  async deleteProduct(req, res) {
    const { product_id } = req.params;

    const isvalid = isValidID({ product_id });
    if (!isvalid) {
      return res.status(400).json({
        error: "Product ID is not valid",
      });
    }

    await Tag.deleteMany({ product_id: { $in: [product_id] } });
    await ShareLinks.deleteMany({ product_id: { $in: [product_id] } });
    await ProductVariation.deleteMany({ product_id: { $in: [product_id] } });
    await Discount.deleteMany({ product_id: { $in: [product_id] } });
    await VariationOption.deleteMany({
      product_id: { $in: [product_id] },
    });
    await ProductInventory.deleteMany({ product_id: { $in: [product_id] } });

    await Product.findByIdAndDelete({ _id: product_id });

    res.status(200).json({
      message: "Deleted product successfully",
    });
  },

  // Get all products
  async getProducts(req, res) {
    const products = await Product.find({ isValid: true });

    res.status(200).json({
      products,
    });
  },

  // Get prodcuts by text
  async getProductsText(req, res) {
    const { name } = req.params;

    const name_search_regex = new RegExp(escape(name.trim()), "i");

    const products = await Product.find({
      $or: [
        {
          name: name_search_regex,
        },
      ],
    });
    res.status(200).json({
      products,
    });
  },

  // Get Single product
  async getProduct(req, res) {
    const { product_id } = req.params;

    const isvalid = isValidID({ product_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Product ID is not valid",
      });
    }

    const product = await Product.findById({ _id: product_id });
    const variations = await ProductVariation.find({ product_id: product_id });
    const options = await VariationOption.find({ product_id });
    const tags = await Tag.find({ product_id: product_id });
    const inventories = await ProductInventory.find({ product_id: product_id });
    const discount = await Discount.findOne({ product_id: product_id });

    if (product) {
      return res.status(200).json({
        product,
        variations,
        inventories,
        discount,
        tags,
        options,
      });
    } else {
      return res.status(400).json({
        message: "Product not found!",
        product,
      });
    }
  },

  // Get sortedProducts
  async getSortedProducts(req, res) {
    const { key, value, from, to } = req.params;

    const products = await Product.aggregate([
      {
        $sort: { [key]: Number(value) },
      },
      {
        $skip: Number(from),
      },
      {
        $limit: Number(to),
      },
    ]);

    res.status(200).json({
      products,
    });
  },

  // Get Product discount
  async getDiscount(req, res) {
    const { product_id } = req.params;

    const isValid = isValidID({ product_id });

    if (!isValid) {
      return res.status(400).json({
        message: "Product ID is not valid!",
      });
    }

    const discount = await Discount.findOne({ product_id: product_id });

    return res.status(200).json({
      discount,
    });
  },

  // Get product with sorting
  async getProductByCategory(req, res) {
    const { category_id, minPrice, maxPrice, queryText } = req.body;

    let name_search_regex = null;
    if (queryText) {
      name_search_regex = new RegExp(escape(queryText?.trim()), "i");
    }
    console.log(name_search_regex);
    const { from, to } = req.params;

    const pipelineOne = [
      maxPrice
        ? {
            $match: {
              price: { $lte: Number(maxPrice), $gte: Number(minPrice) },
            },
          }
        : { $sort: { name: -1 } },
      queryText
        ? {
            $match: { name: name_search_regex },
          }
        : { $skip: Number(from) },
      category_id
        ? {
            $match: {
              category_id: category_id,
            },
          }
        : { $skip: Number(from) },
      {
        $skip: Number(from),
      },
      {
        $limit: Number(to) === 0 ? 1 : Number(to),
      },
    ];

    const products = await Product.aggregate(pipelineOne);

    res.status(200).json({
      products,
    });
  },
  // Get product with limitation
  async getProductsByFiltered(req, res) {
    const { from, to } = req.params;

    const products = await Product.aggregate([
      {
        $skip: Number(from),
      },
      {
        $limit: Number(to) === 0 ? 1 : Number(to),
      },
    ]);

    res.status(200).json({
      products,
    });
  },
  // Get most viewed products
  async mostViewedProducts(req, res) {
    const viewedCategory_id = "63ab3e66ba6e5a0fde1ec5fb";

    try {
      const products = await Product.find({ category_id: viewedCategory_id });
      if (products) {
        return res.status(200).json({
          products,
        });
      }
    } catch (err) {
      return serverError(res, "There was an server error!");
    }
  },
};
