const router = require("express").Router();
const {
  createEmptyProduct,
  createCategories,
  createTag,
  createShareLink,
  productVariations,
  deleteProduct,
  createProduct,
  productVariationsOptions,
  getCategories,
  removeTag,
  removeVariation,
  createDiscount,
  inventory,
  getProducts,
  getInventory,
  getDiscount,
  deleteOption,
  getOptions,
  getVariants,
  getProduct,
  getvariation,
  createRating,
  removeRating,
} = require("../../controller/Admin/product/");

// Authentication checks middleware
const { authChecker } = require("../../middleware/Auth/");

// Product input validation middleware
const {
  productValidator,
  productValidatorHandler,
} = require("../../middleware/Validator/product/productValidations");

// Product category validation middleware
const {
  categoreisValidator,
  categoriesValidatorHandler,
} = require("../../middleware/Validator/categories/categoriesValidations");

// Product tag validation middleware
const {
  tagValidator,
  tagValidatorHandler,
} = require("../../middleware/Validator/product/productTagValidation");

// Product share link validation middleware
const {
  shareLinkValidator,
  shareLinkValidatorHandler,
} = require("../../middleware/Validator/product/productShareLink");
// Product variation validation middleware
const {
  variationValidator,
  variationValidatorHandler,
} = require("../../middleware/Validator/product/productVariations");

// Product variation validation middleware
const {
  variationOptionsValidator,
  variationOptionsValidatorHandler,
} = require("../../middleware/Validator/variations/variationOptions");

// Discount Validation middleware
const {
  discountValidatorHandler,
  discountValidation,
} = require("../../middleware/Validator/discount/discountValidations");

// Qunatity validation middleware
const {
  quantityValidation,
  quantityValidatorHandler,
} = require("../../middleware/Validator/inventory/invantoryValidation");

// Delete product
const {
  delProductValidator,
  delPorductValidatorHandler,
} = require("../../middleware/Validator/product/deleteProduct");
const { orderValidation } = require("../../middleware/Validator/order");
const {
  ratingValidator,
  ratingValidatorHandler,
} = require("../../middleware/Validator/product/productRating");
const {
  removeRatingValidator,
  removeRatingValidatorHandler,
} = require("../../middleware/Validator/product/removeRating");

// Create a new empty product
router.get("/createemptyproduct", authChecker, createEmptyProduct);

// Create a new product
router.post(
  "/createproduct",
  authChecker,
  productValidator,
  productValidatorHandler,
  createProduct
);

// Create a new product category
router.post(
  "/createcategory",
  authChecker,
  categoreisValidator,
  categoriesValidatorHandler,
  createCategories
);

// Get categories
router.get("/getcategories", authChecker, getCategories);

// Create a product tag
router.post("/createtag", tagValidator, tagValidatorHandler, createTag);

// Remove tag
router.post("/romvetag", authChecker, removeTag);

// Create share_link
router.post(
  "/createsharelink",
  authChecker,
  shareLinkValidator,
  shareLinkValidatorHandler,
  createShareLink
);

// Product variation
router.post(
  "/productvariation",
  authChecker,
  variationValidator,
  variationValidatorHandler,
  productVariations
);

// Remove variation
router.post("/removevariation", authChecker, removeVariation);

// Create Product variation Options
router.post(
  "/variationoption",
  authChecker,
  variationOptionsValidator,
  variationOptionsValidatorHandler,
  productVariationsOptions
);

// Delete product variation option
router.delete("/deleteoption/:option_id", authChecker, deleteOption);

// Create a new discount
router.post(
  "/creatediscount/:product_id",
  authChecker,
  discountValidation,
  discountValidatorHandler,
  createDiscount
);

// Create a inventory
router.post(
  "/inventory/:product_id",
  authChecker,
  quantityValidation,
  quantityValidatorHandler,
  inventory
);

// Delete a product
router.delete(
  "/deleteproduct/:product_id",
  authChecker,
  delProductValidator,
  delPorductValidatorHandler,
  deleteProduct
);

// Create Product rating
router.post(
  "/createrating",
  authChecker,
  ratingValidator,
  ratingValidatorHandler,
  createRating
);
// remove rating
router.post(
  "/removerating/:product_id",
  authChecker,
  removeRatingValidator,
  removeRatingValidatorHandler,
  removeRating
);

// get products
router.get("/getproducts", getProducts);

// Get single product
router.get("/getproduct/:product_id", getProduct);

// Get inventory
router.get("/getinventory/:product_id", authChecker, getInventory);

// Get product discount
router.get("/getdiscount/:product_id", authChecker, getDiscount);

// Get product  variations
router.get("/getvariations/:product_id", getVariants);

// Get Variation
router.get("/getvariation/:product_id", getvariation);

// Get variation options
router.get("/getoptions/:variation_id", authChecker, getOptions);

module.exports = router;
