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
  addUserValidators,
  addUserValidatorHandler,
  loginValidator,
} = require("../../middleware/Validator/user/userValidator");

// Add user
router.post(
  "/register",
  addSocialUser,
  addUserValidators,
  addUserValidatorHandler,
  addCustomUser
);

router.post("/useraddress", authchecker, userAddress);

router.get("/getuseraddress", authchecker, getUserAddress);

router.post("/login", loginValidator, login);

module.exports = router;
