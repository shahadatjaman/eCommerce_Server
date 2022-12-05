const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const tagSchema = new Schema({
  product_id: {
    type: ObjectId,
  },
  tag_name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Tags = model("TAG", tagSchema);
