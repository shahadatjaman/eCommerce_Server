const { param, validationResult } = require("express-validator");

const emailValidator = [
  param("email")
    .trim()
    .notEmpty()
    .withMessage("Email must be provide!")
    .isEmail()
    .withMessage("Email must be valida!"),
];

const emailValidatorHandler = (req, res, next) => {
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
  emailValidator,
  emailValidatorHandler,
};
