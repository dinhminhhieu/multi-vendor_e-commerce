const router = require("express").Router();
const chatController = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/chat/customer/add-friend", chatController.add_friend);

router.post(
  "/chat/customer/send-message-seller",
  chatController.send_message_seller
);

router.get(
  "/chat/seller/get-customers/:sellerId",
  chatController.get_customers
);

router.get(
  "/chat/seller/get-customer-messages/:customerId",
  authMiddleware,
  chatController.get_customer_messages
);

router.post(
  "/chat/seller/send-message-customers",
  authMiddleware,
  chatController.send_message_customers
);

router.get(
  "/chat/admin/get-sellers",
  authMiddleware,
  chatController.get_sellers
);

router.post(
  "/chat/admin/send-message-sellers-admin",
  authMiddleware,
  chatController.send_message_sellers_admin
);

router.get(
  "/chat/get-admin-messages/:receverId",
  authMiddleware,
  chatController.get_admin_messages
);

router.get(
  "/chat/get-seller-messages",
  authMiddleware,
  chatController.get_seller_messages
);

module.exports = router;
