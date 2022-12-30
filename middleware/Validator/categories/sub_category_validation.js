const { check, validationResult } = require("express-validator");

const subCategoreisValidator = [
  check("parent_category_id")
    .notEmpty()
    .withMessage("Product parent categiry id is required!")
    .trim(),

  check("sub_category_name")
    .notEmpty()
    .withMessage("Product sub categiry name is required!")
    .trim(),
];

const subCategoriesValidatorHandler = (req, res, next) => {
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
  subCategoreisValidator,
  subCategoriesValidatorHandler,
};
