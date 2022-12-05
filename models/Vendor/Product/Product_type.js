const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const productTypeSchema = new Schema({
  product_id: {
    type: ObjectId,
    required: true,
  },

  product_name: {
    type: String,
    required: true,
  },
});
