const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

const deleteProductsValidator = [
  check("products").custom((val) => {
    if (!val) {
      throw createHttpError("Products id must be array");
    }
    if (val.length === 0) {
      throw createHttpError("Products id must be array");
    }
  }),
];

const delPorductsValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  deleteProductsValidator,
  delPorductsValidatorHandler,
};
