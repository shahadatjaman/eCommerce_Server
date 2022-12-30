const { check, validationResult } = require("express-validator");

const categoreisValidator = [
  check("category_name")
    .notEmpty()
    .withMessage("Product categiry name is required!")
    .trim(),
  check("icon_name")
    .notEmpty()
    .withMessage("Icon name(URL) is required!")
    .trim(),
];

const categoriesValidatorHandler = (req, res, next) => {
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
  categoreisValidator,
  categoriesValidatorHandler,
};
