const { Schema, model, Decimal128 } = require("mongoose");
const { ObjectId } = Schema.Types;
const { requiremnet } = require("../../../utils");
const ratingSchema = new Schema({
  user_id: {
    type: ObjectId,
    ...requiremnet,
  },
  product_id: {
    type: ObjectId,
    ...requiremnet,
  },
  rating: {
    type: Number,
    ...requiremnet,
  },

  text: {
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

module.exports = Rating = model("Rating", ratingSchema);
