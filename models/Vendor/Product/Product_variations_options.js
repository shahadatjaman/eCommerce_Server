const { Schema, model, Decimal128 } = require("mongoose");
const { ObjectId } = Schema.Types;
const { requiremnet } = require("../../../utils/");
const product_variations_options_schema = new Schema({
  product_variations_id: {
    type: ObjectId,
    ...requiremnet,
  },
  product_id: {
    type: ObjectId,
    ...requiremnet,
  },
  variation_type: {
    type: String,
    ...requiremnet,
  },
  value: {
    type: String,
    ...requiremnet,
  },
  price: Decimal128,
});

module.exports = ProductVariationsOptions = model(
  "PRODUCT_VARIATION_OPTIONS",
  product_variations_options_schema
);
