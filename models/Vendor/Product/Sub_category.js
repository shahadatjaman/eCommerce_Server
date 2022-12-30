const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const subCategoriesSchema = new Schema({
  parent_category_id: {
    type: ObjectId,
    required: true,
  },
  sub_category_name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Sub_categories = model("SUB_CATEGORIE", subCategoriesSchema);
