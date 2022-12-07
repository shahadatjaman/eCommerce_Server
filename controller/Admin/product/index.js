const Product = require("../../../models/Vendor/Product/Product");
const { newTime, objectId, isValidID } = require("../../../utils");
const Categories = require("../../../models/Vendor/Product/Categories");
const Tag = require("../../../models/Vendor/Product/Tag");
const ShareLinks = require("../../../models/Vendor/Product/Share_link");
const ProductVariation = require("../../../models/Vendor/Product/Products_variations");
const VariationOption = require("../../../models/Vendor/Product/Product_variations_options");
const Product_variations_options = require("../../../models/Vendor/Product/Product_variations_options");
const Discount = require("../../../models/Vendor/Product/Discount");
const ProductInventory = require("../../../models/Vendor/Product/Product_inventory");
const Rating = require("../../../models/Vendor/Product/Rating");

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
      category_id: "_",
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
  // Porduct category
  async createCategories(req, res) {
    let { category_name, icon_name } = req.body;

    const categoriesName = await Categories.findOne({ category_name });

    if (categoriesName) {
      return res.status(400).json({
        message: "Categories name is already used!",
      });
    }

    const newCategory = new Categories({
      category_name,
      icon_name,
    });

    const category = await newCategory.save();

    return res.status(200).json({
      message: "Product category created successfully",
      category,
    });
  },
  // Get category
  async getCategories(req, res) {
    const category = await Categories.find();

    res.status(200).json({
      message: "Categories",
      category,
    });
  },
  // Product tag
  async createTag(req, res) {
    const { product_id, tag_name } = req.body;

    const newTag = new Tag({
      product_id,
      tag_name,
    });

    const tag = await newTag.save();

    res.status(200).json({
      message: "Tag saved successfully",
      tag,
    });
  },
  async removeTag(req, res) {
    const { tag_id } = req.body;
    if (!tag_id) {
      return res.status(400).json({
        error: "tag_id is required!",
      });
    }

    const isvalid = isValidID({ product_id: tag_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Tag id must be valid!",
      });
    }
    const removedTag = await Tag.findByIdAndDelete({ _id: tag_id });

    res.status(200).json({
      message: "Tag successfuly deleted!",
      removedTag,
    });
  },
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

    const isvalid = isValidID({ product_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Product ID is not valid",
      });
    }

    const variation = await ProductVariation.findOne({ product_id });

    res.status(200).json({
      variation,
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

  // Create Discount
  async createDiscount(req, res) {
    const { product_id } = req.params;
    const { discount_percent } = req.body;

    const newDiscount = new Discount({
      product_id,
      discount_percent,
      active: true,
      createdAt: newTime(),
      updatedAt: newTime(),
    });

    const discount = await newDiscount.save();

    res.status(200).json({
      message: "Product discount created successfully",
      discount,
    });
  },

  // Create product inventory
  async inventory(req, res) {
    const { product_id } = req.params;

    const isvalid = isValidID({ product_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Product ID is not valid",
      });
    }

    const existedInventory = await ProductInventory.find({
      product_id: product_id,
    });

    if (existedInventory.length > 0) {
      const updatedInventory = await ProductInventory.findOneAndUpdate(
        { product_id: product_id },
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json({ inventory: updatedInventory });
    }

    const { quantity, weight } = req.body;

    const newInventory = new ProductInventory({
      product_id,
      quantity,
      weight,
      createdAt: newTime(),
      updatedAt: newTime(),
    });

    const inventory = await newInventory.save();

    res.status(200).json({
      message: "Product Inventory successfuly created!",
      inventory,
    });
  },

  // Create a product rating
  async createRating(req, res) {
    const { _id } = req.user;
    const { product_id, rating, text } = req.body;

    const ratings = await Rating.findOne({ product_id, user_id: _id });

    if (ratings) {
      // TODO: Update the rating
      const updatedRating = await Rating.findOneAndUpdate(
        {
          product_id,
          user_id: _id,
        },
        {
          ...req.body,
          updatedAt: newTime(),
        },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        message: "Ok",
        productRating: updatedRating,
      });
    } else {
      // TODO: Create a new raing
      const newRating = new Rating({
        user_id: _id,
        product_id,
        rating,
        text,
        createdAt: newTime(),
        updatedAt: newTime(),
      });
      const productRating = await newRating.save();
      return res.status(200).json({
        productRating,
      });
    }
  },
  // Remove rating
  async removeRating(req, res) {
    const { _id } = req.user;

    const { product_id } = req.params;

    const removedRating = await Rating.findOne({ user_id: _id, product_id });

    res.status(200).json({
      message: "Rating successfuly deleted!",
      removedRating,
    });
  },
  // Get all products
  async getProducts(req, res) {
    const products = await Product.find({ isValid: true });

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

  // Get inventories
  async getInventory(req, res) {
    const { product_id } = req.params;

    const isValid = isValidID({ product_id });

    if (!isValid) {
      return res.status(400).json({
        message: "Product ID is not valid!",
      });
    }

    const inventory = await ProductInventory.find({ product_id });

    return res.status(200).json({
      inventory,
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

    const discount = await Discount.find({ product_id: product_id });

    return res.status(200).json({
      discount,
    });
  },
};
