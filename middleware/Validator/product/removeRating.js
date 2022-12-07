const { validationResult, param } = require("express-validator");

const Product = require("../../../models/Vendor/Product/Product");

const removeRatingValidator = [
  param("product_id")
    .notEmpty()
    .withMessage("product_id must be provide!")
    .isMongoId()
    .withMessage("product_id must be valid id!")
    .custom(async (value) => {
      try {
        const product = await Product.findById({ product_id: value });
        if (product) {
          throw createError("product_id isn't valid!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    })
    .withMessage("product_id isn't valid!"),
];

const removeRatingValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    return next();
  } else {
    return res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { removeRatingValidator, removeRatingValidatorHandler };
