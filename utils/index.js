const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports = {
  objectId(_id) {
    return _id.toString();
  },
  newTime() {
    return new Date().toISOString();
  },
  mongooseID() {
    return ObjectId();
  },
  isValidID({ product_id }) {
    if (!product_id) {
      return false;
    } else {
      return ObjectId.isValid(product_id);
    }
  },
  isValidMongoID(id) {
    if (!id) {
      return false;
    } else {
      return ObjectId.isValid(id);
    }
  },

  requiremnet() {
    return {
      required: true,
      trim: true,
    };
  },

  escape(str) {
    return str?.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  },
};
