const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const paymentController = require("../controllers/payment/paymentController");

router.get(
  "/payment/create-stripe-connect-account",
  authMiddleware,
  paymentController.create_stripe_connect_account
);
router.put(
  "/payment/active-stripe-connect-account/:activeCode",
  authMiddleware,
  paymentController.active_stripe_connect_account
);

router.get(
  "/payment/get-seller-payment-request/:sellerId",
  authMiddleware,
  paymentController.get_seller_payment_request
);

router.post("/payment/send-withdraw-request", authMiddleware, paymentController.send_withdraw_request);

router.get("/payment/get-withdraw-request", authMiddleware, paymentController.get_withdraw_request);

router.post(
  "/payment/confirm-withdraw-request",
  authMiddleware,
  paymentController.confirm_withdraw_request
);

module.exports = router;
