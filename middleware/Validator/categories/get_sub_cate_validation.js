const { param, validationResult } = require("express-validator");

const get_sub_categoreisValidator = [
  param("parent_id")
    .notEmpty()
    .withMessage("Product parent categiry id is required!")
    .isMongoId()
    .withMessage("Parent category id must be valid id!"),
];

const get_sub_categoriesValidatorHandler = (req, res, next) => {
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
  get_sub_categoreisValidator,
  get_sub_categoriesValidatorHandler,
};
