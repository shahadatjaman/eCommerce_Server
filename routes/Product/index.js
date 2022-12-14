const router = require("express").Router();
const {
  createEmptyProduct,
  createShareLink,
  deleteProduct,
  createProduct,
  getProducts,
  getDiscount,
  getProduct,
  getProductByCategory,
  getProductsByFiltered,
  getProductsText,
  getSortedProducts,
} = require("../../controller/Admin/product/");

// Authentication checks middleware
const { authChecker, authUser } = require("../../middleware/Auth/");

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
const {
  getRatingValidatorHandler,
  getRatingValidator,
} = require("../../middleware/Validator/product/getRatingValidator");

const {
  createRating,
  removeRating,
  getRating,
  getRatings,
} = require("../../controller/Admin/product/rating");
const { createDiscount } = require("../../controller/Admin/product/discount");
const {
  createTag,
  removeTag,
  getTags,
} = require("../../controller/Admin/product/Tag");
const {
  productVariations,
  removeVariation,
  productVariationsOptions,
  deleteOption,
  getVariants,
  getvariation,
  getOptions,
} = require("../../controller/Admin/product/variation");
const {
  inventory,
  createInventory,
  getInventory,
} = require("../../controller/Admin/product/inventory");
const {
  createCategories,
  getCategories,
  getCategory,
} = require("../../controller/Admin/product/category");
const {
  getCategoryValidator,
  getCategoriesValidatorHandler,
} = require("../../middleware/Validator/categories/getCategoryValidation");
const {
  productCategoryValidatorHandler,
  productCategoryValidator,
} = require("../../middleware/Validator/product/getProductWithCategoryValidation");
const {
  productIdValidator,
  productIdValidatorHandler,
} = require("../../middleware/Validator/product/product_idValidation");
const {
  getProductsValidator,
  getProductsValidatorHandler,
} = require("../../middleware/Validator/product/getProductsValidation");
const {
  getTagsValidation,
  getTagsValidatorHandler,
} = require("../../middleware/Validator/tags");
const {
  getProductsByTextValidator,
  getProductsByTextValidatorHandler,
} = require("../../middleware/Validator/product/getProductByText");
const {
  getSortedValidator,
  getSortedValidatorHandler,
} = require("../../middleware/Validator/product/sortedProducts");

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

// Get product by text
router.get(
  "/getproducts/:name",
  getProductsByTextValidator,
  getProductsByTextValidatorHandler,
  getProductsText
);

// get sorted products
router.get(
  "/getsortedproducts/:key/:value/:from-:to",
  getSortedValidator,
  getSortedValidatorHandler,
  getSortedProducts
);

// Get categories
router.get("/getcategories", getCategories);

// Get categories by product id
router.get(
  "/getcategory/:product_id",
  getCategoryValidator,
  getCategoriesValidatorHandler,
  getCategory
);

// Create a product tag
router.post("/createtag", tagValidator, tagValidatorHandler, createTag);

// Remove tag
router.post("/romvetag", authChecker, removeTag);

// Get tags
router.get(
  "/gettags/:from-:to",
  getTagsValidation,
  getTagsValidatorHandler,
  getTags
);

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
  createInventory
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
  authUser,
  ratingValidator,
  ratingValidatorHandler,
  createRating
);
// remove rating
router.delete(
  "/removerating/:product_id",
  authUser,
  removeRatingValidator,
  removeRatingValidatorHandler,
  removeRating
);

// Get ratings
router.get("/getratings/:product_id", getRatings);

// Get rating by user id and product id
router.get(
  "/getrating/:product_id",
  authUser,
  getRatingValidator,
  getRatingValidatorHandler,
  getRating
);

// get products
router.get("/getproducts", getProducts);

// Get product by category id
router.post(
  "/getproducts/:from-:to",
  productCategoryValidator,
  productCategoryValidatorHandler,
  getProductByCategory
);

// Get single product
router.get("/getproduct/:product_id", getProduct);

// Get inventory
router.get("/getinventory/:product_id", authChecker, getInventory);

// Get product discount
router.get("/getdiscount/:product_id", getDiscount);

// Get product  variations
router.get("/getvariations/:product_id", getVariants);

// Get Variation
router.get(
  "/getvariation/:product_id",
  productIdValidator,
  productIdValidatorHandler,
  getvariation
);

// Get variation options
router.get("/getoptions/:variation_id", authChecker, getOptions);

router.get(
  "/getproducts/:from-:to",
  getProductsValidator,
  getProductsValidatorHandler,
  getProductsByFiltered
);

module.exports = router;
