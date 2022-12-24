const { param, validationResult, check } = require("express-validator");

const verifylValidator = [
  param("email")
    .trim()
    .notEmpty()
    .withMessage("Email must be provide!")
    .isEmail()
    .withMessage("Email must be valida!"),
  check("code").trim().notEmpty().withMessage("code must be provide!"),
];

const verifyValidatorHandler = (req, res, next) => {
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

module.exports = {
  verifylValidator,
  verifyValidatorHandler,
};
