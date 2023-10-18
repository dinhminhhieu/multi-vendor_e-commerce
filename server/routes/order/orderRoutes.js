const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");

// customer
router.post("/home/order/palce-order", orderController.place_order);
router.get(
  "/home/customer/get-dashboard-index-data/:userId",
  orderController.get_dashboard_index_data
);
router.get(
  "/home/customer/get-orders/:customerId/:status",
  orderController.get_orders
);
router.get("/home/customer/get-order/:orderId", orderController.get_order);

// admin
router.get("/admin/get-admin-orders", orderController.get_admin_orders);

module.exports = router
