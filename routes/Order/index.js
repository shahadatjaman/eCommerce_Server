const router = require("express").Router();
const { authUser } = require("../../middleware/Auth/");

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
  authUser,
  orderValidation,
  orderValidatorHandler,
  creareOrder
);

// Get order by _id
router.get("/getorder/:order_id", authUser, getOrder);

// Get Orders
router.get("/getorders", authUser, getOrders);

module.exports = router;
