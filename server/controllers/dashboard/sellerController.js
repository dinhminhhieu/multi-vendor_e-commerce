const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utils/response");

class sellerController {
  get_seller_request = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        //const seller
      } else {
        const sellers = await sellerModel
          .find({ status: "pending" })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await sellerModel
          .find({ status: "pending" })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new sellerController();
