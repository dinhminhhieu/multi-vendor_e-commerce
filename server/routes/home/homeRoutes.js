const router = require("express").Router();
const homeController = require("../../controllers/home/homeController");

router.get("/get-category", homeController.get_category);
router.get("/get-products", homeController.get_products);
router.get("/get-product/:slug", homeController.get_product);
router.get("/price-range-product", homeController.price_range_product);
router.get("/query-products", homeController.query_products);

module.exports = router;
