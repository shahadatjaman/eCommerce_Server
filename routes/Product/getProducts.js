const router = require("express").Router();
const {
  getProductsByUserId,
  getProductForUpdate,
  deleteProduct,
  deleteProducts,
} = require("../../controller/Admin/product");
const { authAsAdmin } = require("../../middleware/Auth");
const {
  deleteProductsValidator,
  delPorductsValidatorHandler,
} = require("../../middleware/Validator/product/deletes_products");
const {
  productIdValidator,
  productIdValidatorHandler,
} = require("../../middleware/Validator/product/product_idValidation");

const {
  getProductsByTextValidator,
  getProductsByTextValidatorHandler,
} = require("../../middleware/Validator/product/getProductByText");
const {
  getProducts_with_text,
  update_product_discount,
  update_product_price,
  set_product_visibility,
} = require("../../controller/Admin/product/Product");

const {
  updateProductInventory,
  updateProductInventoryValidatorHandler,
} = require("../../middleware/Validator/discount/update_inventory");
const {
  updateProductVisibility,
  updateProductVisibilityValidatorHandler,
} = require("../../middleware/Validator/discount/update_Product_Visibility");

router.get("/get-product-by-id", authAsAdmin, getProductsByUserId);

router.get(
  "/get_product_by-product_id/:product_id",
  authAsAdmin,
  productIdValidator,
  productIdValidatorHandler,
  getProductForUpdate
);

router.post("/delete_products", authAsAdmin, deleteProducts);

router.get(
  "/searched_prodcuts/:name",
  authAsAdmin,
  getProductsByTextValidator,
  getProductsByTextValidatorHandler,
  getProducts_with_text
);

router.post(
  "/products_discount_update",
  authAsAdmin,
  updateProductInventory,
  updateProductInventoryValidatorHandler,
  update_product_discount
);

router.post(
  "/products_price_update",
  authAsAdmin,
  updateProductInventory,
  updateProductInventoryValidatorHandler,
  update_product_price
);

router.post(
  "/set_product_visibility",
  authAsAdmin,
  updateProductVisibility,
  updateProductVisibilityValidatorHandler,
  set_product_visibility
);
module.exports = router;
