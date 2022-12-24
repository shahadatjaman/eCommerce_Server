const router = require("express").Router();
const { authAsUser } = require("../../middleware/Auth/");

const {
  creareOrder,
  getOrder,
  getOrders,
} = require("../../controller/Admin/order");
const {
  orderValidation,
  orderValidatorHandler,
} = require("../../middleware/Validator/order/");

router.post(
  "/createorder",
  authAsUser,
  orderValidation,
  orderValidatorHandler,
  creareOrder
);

// Get order by _id
router.get("/getorder/:order_id", authAsUser, getOrder);

// Get Orders
router.get("/getorders", authAsUser, getOrders);

module.exports = router;
