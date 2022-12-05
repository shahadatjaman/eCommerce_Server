const { check, validationResult } = require("express-validator");

const shareLinkValidator = [
  check("icon_name")
    .isLength({ min: 1 })
    .withMessage("Icon name is required!")
    .trim(),
  check("product_id")
    .isMongoId()
    .withMessage("Product id should be valid!")
    .trim(),
  check("url")
    .isLength({ min: 1 })
    .withMessage("Share link is required!")
    .trim(),
];

const shareLinkValidatorHandler = (req, res, next) => {
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
  shareLinkValidator,
  shareLinkValidatorHandler,
};
