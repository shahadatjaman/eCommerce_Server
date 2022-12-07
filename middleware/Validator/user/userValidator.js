const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const addUserValidators = [
  check("username")
    .isLength({ min: 4 })
    .withMessage("Username is required!")
    .matches(/\d/)
    .withMessage("must contain a number")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ username: value });
        if (user) {
          throw createError("username is not available!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Invalid email address!"),

  check("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 and should contain at least 1 lowercase, 1 upperCase, 1 number and 1 symbol!"
    ),
];

const addUserValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: {
        errors: mappedErrors,
      },
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidatorHandler,
};
