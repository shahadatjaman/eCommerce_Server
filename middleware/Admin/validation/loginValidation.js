const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../../models/User/User");

// Express validation
const adminloginVali = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Enter a valid email!")
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        if (user.role !== "admin") {
          throw createError(`There will be no gain 😂`);
        }
      } else {
        throw createError(`There will be no gain 🙂`);
      }
    }),

  check("password").notEmpty().withMessage("Ok, Try to give the password"),
];

const adminLoginValidatorHandler = (req, res, next) => {
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
  adminloginVali,
  adminLoginValidatorHandler,
};
