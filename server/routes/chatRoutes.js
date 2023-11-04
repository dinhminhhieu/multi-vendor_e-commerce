const router = require("express").Router();
const chatController = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");
router.post("/chat/customer/add-friend", chatController.add_friend);

module.exports = router;
