const router = require("express").Router();
const { authAsUser } = require("../../middleware/Auth/");

const {
  passwordlValidator,
  passwordValidatorHandler,
} = require("../../middleware/Validator/user/passwordVali");

const {
  addCustomUser,
  addSocialUser,
  login,
  getUser,
  getAccessToken,
  forgetPassword,
  verifyCode,
  checkCodeValidity,
  changePassword,
  createNewPassword,
  removeUserAccount,
  uploadUserAvatar,
  updateUser,
  chechPasswordIsChangeAble,
} = require("../../controller/user/");
const {
  userAddress,
  getUserAddress,
} = require("../../controller/user/userAddress");
const {
  emailValidator,
  emailValidatorHandler,
} = require("../../middleware/Validator/user/forgetPassword");
const {
  getUserValidator,
  getUserValidatorHandler,
} = require("../../middleware/Validator/user/getUserValidator");

const {
  loginValidatorHandler,
  loginValidator,
} = require("../../middleware/Validator/user/loginValidation");
const {
  addUserBySocialValidators,
  addUserBySocialValidatorHandler,
} = require("../../middleware/Validator/user/socialUser");

const {
  addUserValidators,
  addUserValidatorHandler,
} = require("../../middleware/Validator/user/userValidator");
const {
  verifylValidator,
  verifyValidatorHandler,
} = require("../../middleware/Validator/user/verifyCode");
const {
  usernameValidator,
  usernameValidatorHandler,
} = require("../../middleware/Validator/user/usernameValidation");
const {
  validPassword,
  validPasswordHandler,
} = require("../../middleware/Validator/user/validPassword");
const upload = require("../../utils/multer");
const {
  updatedUserValidator,
  updatedValidatorHandler,
} = require("../../middleware/Validator/user/updatedUserValid");

// Create account by user
router.post(
  "/register",
  addUserValidators,
  addUserValidatorHandler,
  addCustomUser
);

// Create account by socil media
router.post(
  "/adduserbysocial",
  addUserBySocialValidators,
  addUserBySocialValidatorHandler,
  addSocialUser
);

router.post("/useraddress", authAsUser, userAddress);

router.get("/getuseraddress", authAsUser, getUserAddress);
router.get(
  "/getuser/:user_id",
  getUserValidator,
  getUserValidatorHandler,
  getUser
);
router.post("/login", loginValidator, loginValidatorHandler, login);

// Testing router
router.get("/refreshtoken", getAccessToken);

// Forget password
router.get(
  "/forget/:email",
  emailValidator,
  emailValidatorHandler,
  forgetPassword
);

// Check verification code
router.post(
  "/verifycode/:email",
  verifylValidator,
  verifyValidatorHandler,
  verifyCode
);
// Check verication token validity
router.get(
  "/checkvalidity/:email",
  emailValidator,
  emailValidatorHandler,
  checkCodeValidity
);

// ChangePassword
router.post(
  "/change_password",
  authAsUser,
  passwordlValidator,
  passwordValidatorHandler,
  changePassword
);

// Delete user Account
router.post(
  "/delete_user_account",
  authAsUser,
  usernameValidator,
  usernameValidatorHandler,
  removeUserAccount
);

// Create new password
router.post(
  "/new_password",
  authAsUser,
  validPassword,
  validPasswordHandler,
  createNewPassword
);

// Checking the password changeable or not
router.get("/isvalid_pass_url", authAsUser, chechPasswordIsChangeAble);

// Upload file
router.post(
  "/upload_avatar",
  authAsUser,
  upload.single("image"),
  uploadUserAvatar
);

// Update user
router.post(
  "/update_user",
  authAsUser,
  updatedUserValidator,
  updatedValidatorHandler,
  updateUser
);

const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 0,
  sameSite: "None",
};

router.post("/remove_cookie", (req, res) => {
  res.cookie("refreshToken", "", { ...cookieOptions });
  res.send("Cookie removed");
});

module.exports = router;
