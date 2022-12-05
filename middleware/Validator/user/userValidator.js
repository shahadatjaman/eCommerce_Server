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
    .isEmail()
    .withMessage("Invalid email address!")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
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

// Normal Validation
const loginValidator = (req, res, next) => {
  const { username, password } = req.body;
  const errors = {};
  if (!username) {
    errors.username = "Username is required";
  } else if (username.trim().length === 0) {
    errors.username = "Username is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.trim().length === 0) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length === 0) {
    next();
  } else {
    throw errors;
  }
};

module.exports = {
  addUserValidators,
  addUserValidatorHandler,
  loginValidator,
};
