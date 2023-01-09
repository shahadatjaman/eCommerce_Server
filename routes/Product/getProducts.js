const router = require("express").Router();
const {
  getProductsByUserId,
  getProductForUpdate,
} = require("../../controller/Admin/product");
const { authAsAdmin } = require("../../middleware/Auth");
const {
  productIdValidator,
  productIdValidatorHandler,
} = require("../../middleware/Validator/product/product_idValidation");

router.get("/get-product-by-id", authAsAdmin, getProductsByUserId);

router.get(
  "/get_product_by-product_id/:product_id",
  authAsAdmin,
  productIdValidator,
  productIdValidatorHandler,
  getProductForUpdate
);

module.exports = router;
