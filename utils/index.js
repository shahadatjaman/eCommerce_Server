const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");

module.exports = (() => {
  const objectId = (_id) => {
    return _id.toString();
  };
  const newTime = () => {
    return new Date().toISOString();
  };
  const mongooseID = () => {
    return ObjectId();
  };
  const isValidID = ({ product_id }) => {
    if (!product_id) {
      return false;
    } else {
      return ObjectId.isValid(product_id);
    }
  };
  const isValidMongoID = (id) => {
    if (!id) {
      return false;
    } else {
      return ObjectId.isValid(id);
    }
  };

  const requiremnet = () => {
    return {
      required: true,
      trim: true,
    };
  };

  const escape = (str) => {
    return str?.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  /**
   *
   * @param {Obj} values
   * @param {String} SECRET_KEY
   * @param {"0m"} life
   * @returns
   */
  const tokenGenerate = (values, SECRET_KEY, life) => {
    const token = jwt.sign({ ...values }, SECRET_KEY, {
      expiresIn: life,
    });
    return token;
  };
  const isValidToken = async (token) => {
    return await jwt.verify(token, process.env.SECRET_KEY);
  };

  return {
    objectId,
    newTime,
    mongooseID,
    isValidID,
    isValidMongoID,
    requiremnet,
    escape,
    tokenGenerate,
    isValidToken,
  };
})();
