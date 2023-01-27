const Product = require("../../../models/Vendor/Product/Product");
const ProductInventory = require("../../../models/Vendor/Product/Product_inventory");
const { isValidID, newTime } = require("../../../utils");

module.exports = {
  // Create product inventory
  async createInventory(req, res) {
    const { product_id } = req.params;
    const { _id } = req.user;

    const product = await Product.find({ _id: product_id, user_id: _id });

    if (product) {
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
        quantity: quantity ? quantity : "In Stock",
        weight: weight ? weight : 0,
        createdAt: newTime(),
        updatedAt: newTime(),
      });

      const inventory = await newInventory.save();

      res.status(200).json({
        message: "Product Inventory successfuly created!",
        inventory,
      });
    } else {
      return res.status(400).json({
        message: "Product not found!",
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

    const inventory = await ProductInventory.findOne({ product_id });

    return res.status(200).json({
      inventory,
    });
  },
};
