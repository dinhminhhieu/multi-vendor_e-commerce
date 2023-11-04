const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerToCustomerModel = require("../../models/chat/sellerToCustomerModel");
const { responseReturn } = require("../../utils/response");

class chatController {
  add_friend = async (req, res) => {
    const { sellerId, userId } = req.body;
    console.log(req.body);
  };
}

module.exports = new chatController();
