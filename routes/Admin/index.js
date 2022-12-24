const { login } = require("../../controller/Admin/login");
const {
  adminloginVali,
  adminLoginValidatorHandler,
} = require("../../middleware/Admin/validation/loginValidation");

const router = require("express").Router();

router.post("/login", adminloginVali, adminLoginValidatorHandler, login);

module.exports = router;
