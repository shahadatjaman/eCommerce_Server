const Categories = require("../../../models/Vendor/Product/Categories");

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
};
