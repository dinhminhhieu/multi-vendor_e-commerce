const router = require("express").Router();
const cartController = require("../../controllers/home/cartController");

router.post("/home/product/add-to-cart", cartController.add_to_cart);

module.exports = router;
