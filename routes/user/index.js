const router = require("express").Router();
const authchecker = require("../../authChecker");

const {
  addCustomUser,
  addSocialUser,
  login,
  getUser,
  getAccessToken,
} = require("../../controller/user/");
const {
  userAddress,
  getUserAddress,
} = require("../../controller/user/userAddress");
const {
  getUserValidator,
  getUserValidatorHandler,
} = require("../../middleware/Validator/user/getUserValidator");

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
router.get(
  "/getuser/:user_id",
  getUserValidator,
  getUserValidatorHandler,
  getUser
);
router.post("/login", loginValidator, loginValidatorHandler, login);

// Testing router
router.get("/refreshtoken", getAccessToken);

module.exports = router;
