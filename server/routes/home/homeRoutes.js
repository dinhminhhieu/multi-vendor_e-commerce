const router = require("express").Router();
const homeController = require("../../controllers/home/homeController");

router.get("/get-category", homeController.get_category);

module.exports = router;
