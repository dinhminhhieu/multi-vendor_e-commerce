const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {get_seller_dashboard_data, get_admin_dashboard_data} = require("../../controllers/dashboard/dashboardController")

router.get("/seller/get-seller-dashboard-data", authMiddleware, get_seller_dashboard_data);

router.get(
  "/admin/get-admin-dashboard-data",
  authMiddleware,
  get_admin_dashboard_data
);

module.exports = router
