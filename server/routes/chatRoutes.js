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

module.exports = router;
