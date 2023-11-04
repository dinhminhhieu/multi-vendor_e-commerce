const router = require("express").Router();
const chatController = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/chat/customer/add-friend", chatController.add_friend);

router.post(
  "/chat/customer/send-message-seller",
  chatController.send_message_seller
);

module.exports = router;
