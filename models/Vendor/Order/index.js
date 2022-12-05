const { Schema, model, Decimal128 } = require("mongoose");
const { ObjectId } = Schema.Types;

const { requiremnet } = require("../../../utils");

const orderSchema = new Schema({
  user_id: {
    type: ObjectId,
    ...requiremnet,
  },
  products: {
    type: [
      {
        product_id: {
          type: String,
          ...requiremnet,
        },
        price: {
          type: Decimal128,
          ...requiremnet,
        },
        color_option_id: String,
        size_option_id: String,
        qty: {
          type: Decimal128,
          ...requiremnet,
        },
      },
    ],
  },
  total: {
    type: Decimal128,
    ...requiremnet,
  },
  paid: {
    type: Boolean,
    ...requiremnet,
  },
  currency: {
    type: String,
    ...requiremnet,
  },
  status: {
    type: String,
    ...requiremnet,
  },
  createdAt: {
    type: String,
    ...requiremnet,
  },
  updatedAt: {
    type: String,
    ...requiremnet,
  },
});

module.exports = Order = model("Order", orderSchema);
