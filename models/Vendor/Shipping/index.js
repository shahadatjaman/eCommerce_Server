const { Schema, model, Decimal128 } = require("mongoose");
const { ObjectId } = Schema.Types;

const { requiremnet } = require("../../../utils/");

const shippingSchema = new Schema({
  shipping_target_address_id: {
    type: ObjectId,
    ...requiremnet,
  },
  order_id: {
    type: ObjectId,
    ...requiremnet,
  },
  shipping_method_id: {
    type: ObjectId,
    ...requiremnet,
  },
  status: {
    type: String,
  },
  createdA: {
    type: String,
  },
});

module.exports = Shipping = model("Shipping", shippingSchema);
