const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const product_variations_schema = new Schema({
  product_id: {
    type: ObjectId,
    required: true,
  },
  variation_img: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = ProductVariations = model(
  "PRODUCT_VARIATION",
  product_variations_schema
);
