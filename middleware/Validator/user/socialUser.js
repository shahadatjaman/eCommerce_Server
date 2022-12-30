const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const addUserBySocialValidators = [
  check("firstName").notEmpty().withMessage("firstName is required!"),
  check("lastName").notEmpty().withMessage("lastName is required!"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Invalid email address!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });

        if (user && user.provider === "user") {
          throw createError(`Please login with username and password!`);
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
];

const addUserBySocialValidatorHandler = (req, res, next) => {
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
  addUserBySocialValidators,
  addUserBySocialValidatorHandler,
};
