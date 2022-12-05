const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const categoriesSchema = new Schema({
  category_name: {
    type: String,
    required: true,
    trim: true,
  },
  icon_name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Categories = model("CATEGORIES", categoriesSchema);
