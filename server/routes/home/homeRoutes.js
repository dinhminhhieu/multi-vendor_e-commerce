const router = require("express").Router();
const homeController = require("../../controllers/home/homeController");

router.get("/get-category", homeController.get_category);
router.get("/get-products", homeController.get_products);

module.exports = router;
