const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const sharelinksSchema = new Schema({
  product_id: {
    type: String,
    required: true,
  },
  icon_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = ShareLinks = model("SHARE_LINK", sharelinksSchema);
