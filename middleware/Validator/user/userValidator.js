const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const addUserValidators = [
  check("vendorName")
    .optional()
    .notEmpty()
    .withMessage("Vendor Name is required!"),
  check("firstName").trim().notEmpty().withMessage("First name is required!"),
  check("lastName").trim().notEmpty().withMessage("Last name is required!"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Invalid email address!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });

        if (user && user.provider !== "user") {
          throw createError(`Your account created with Google/Facebook!`);
        }

        if (user) {
          throw createError(`Your Email already used.`);
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 and should contain at least 1 lowercase, 1 upperCase, 1 number and 1 symbol!"
    ),
  check("role").optional().notEmpty().withMessage("Role is required"),
];

const addUserValidatorHandler = (req, res, next) => {
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
  addUserValidators,
  addUserValidatorHandler,
};
