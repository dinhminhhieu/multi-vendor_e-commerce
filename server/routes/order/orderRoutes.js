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
router.get("/admin/get-admin-order/:orderId", orderController.get_admin_order);
router.put(
  "/admin/admin-order-status-update/update/:orderId",
  orderController.admin_order_status_update
);

// seller
router.get(
  "/seller/get-seller-orders/:sellerId",
  orderController.get_seller_orders
);

module.exports = router
