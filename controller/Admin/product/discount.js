const Discount = require("../../../models/Vendor/Product/Discount");
const { newTime } = require("../../../utils");

module.exports = {
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
};
