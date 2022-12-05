const { Schema, model, Decimal128 } = require("mongoose");

const requirement = {
  required: true,
  trim: true,
};

const discountSchema = new Schema({
  product_id: {
    type: String,
    ...requirement,
  },
  discount_percent: {
    type: Decimal128,
    ...requirement,
  },
  active: {
    type: Boolean,
    ...requirement,
  },
  createdAt: {
    type: String,
    ...requirement,
  },
  updatedAt: {
    type: String,
    ...requirement,
  },
});

module.exports = Discount = model("DISCOUNT", discountSchema);
