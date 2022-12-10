const { Schema, model, Decimal128 } = require("mongoose");
const { ObjectId } = Schema.Types;

const productSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  short_desc: {
    type: String,
    required: true,
    trim: true,
  },
  long_desc: {
    type: String,
    required: true,
    trim: true,
  },
  product_status: {
    type: String,
    required: true,
    trim: true,
  },

  SKU: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Decimal128,
    required: true,
    trim: true,
  },
  tot_rating: {
    type: Number,
  },

  category_id: {
    type: String,
    required: true,
    trim: true,
  },
  product_type: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

module.exports = Product = model("PRODUCTT", productSchema);
