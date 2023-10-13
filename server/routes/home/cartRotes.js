const router = require("express").Router();
const cartController = require("../../controllers/home/cartController");

router.post("/home/product/add-to-cart", cartController.add_to_cart);
router.get("/home/product/get-cart-products/:userId", cartController.get_cart_products);
router.delete(
  "/home/product/delete-card-product/:cartId",
  cartController.delete_card_product
);
router.put("/home/product/quantity-inc/:cartId", cartController.quantity_inc);
router.put("/home/product/quantity-dec/:cartId", cartController.quantity_dec);

module.exports = router;
