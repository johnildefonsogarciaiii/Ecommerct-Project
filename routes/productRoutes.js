const express = require("express");
const authController = require('./../controllers/authController');
const ProductController = require("../controllers/productControllers");
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();


router.use('/:productId/reviews', reviewRouter)

router
  .route("/top-5-highest-rating")
  .get(ProductController.aliasTopProduct, ProductController.getAllProduct);

router.route("/product-stats").get(authController.protect, authController.restrictTo('admin'), ProductController.getProductStats);
// router.route('/monthly-plan/:year').get(ProductController.getMonthlyPlan);

router
  .route("/:id")
  .get(ProductController.getProduct)
  .patch(authController.protect, authController.restrictTo('admin'),ProductController.updateProduct)
  .delete(authController.protect, authController.restrictTo('admin'), ProductController.deleteProduct);


router
  .route("/")
  .get(ProductController.getAllProduct)
  .post(authController.protect, authController.restrictTo('admin'), ProductController.createProduct)




module.exports = router;
