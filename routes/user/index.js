const router = require("express").Router();
const authchecker = require("../../authChecker");
const {
  addCustomUser,
  addSocialUser,
  login,
} = require("../../controller/user/");
const {
  userAddress,
  getUserAddress,
} = require("../../controller/user/userAddress");

const {
  loginValidatorHandler,
  loginValidator,
} = require("../../middleware/Validator/user/loginValidation");

const {
  addUserValidators,
  addUserValidatorHandler,
} = require("../../middleware/Validator/user/userValidator");

// Add user
router.post(
  "/register",
  addUserValidators,
  addUserValidatorHandler,
  addSocialUser,
  addCustomUser
);

router.post("/useraddress", authchecker, userAddress);

router.get("/getuseraddress", authchecker, getUserAddress);

router.post("/login", loginValidator, loginValidatorHandler, login);

module.exports = router;
