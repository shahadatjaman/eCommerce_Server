const { Schema, model, Decimal128 } = require("mongoose");
const { requiremnet } = require("../../../utils/index");

const inventorySchema = new Schema({
  product_id: {
    type: String,
    ...requiremnet,
  },
  quantity: {
    type: String,
    ...requiremnet,
  },
  weight: {
    type: Decimal128,
    ...requiremnet,
  },
});

module.exports = ProductInventory = model("PRODCUT_INVENTORY", inventorySchema);
