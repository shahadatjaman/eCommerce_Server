const Categories = require("../../../models/Vendor/Product/Categories");
const Sub_category = require("../../../models/Vendor/Product/Sub_category");
const { serverError } = require("../../../utils/error");

module.exports = {
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
  // Get categories
  async getCategories(req, res) {
    const category = await Categories.find();

    res.status(200).json({
      message: "Categories",
      category,
    });
  },
  // Get categories by id
  async getCategory(req, res) {
    const { product_id } = req.params;
    const category = await Categories.findOne({ product_id });

    res.status(200).json({
      category,
    });
  },

  // Create sub category
  async createSubCategory(req, res) {
    const { parent_category_id, sub_category_name } = req.body;

    const sub_cate = new Sub_category({
      parent_category_id,
      sub_category_name,
    });

    const new_sub_category = await sub_cate.save();

    if (new_sub_category) {
      return res.status(200).json({
        new_sub_category,
      });
    } else {
      return serverError(res, "There was an server error!");
    }
  },
  // Get sub categories by parent category id
  async getSubCategory(req, res) {
    const { parent_id } = req.params;

    const sub_category = await Sub_category.find({
      parent_category_id: parent_id,
    });

    if (sub_category) {
      return res.status(200).json({
        status: "200",
        sub_category,
      });
    } else {
      return serverError(res, "There was an server error!");
    }
  },
};
