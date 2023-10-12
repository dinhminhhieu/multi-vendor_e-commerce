const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");

class cartController {
  //1. Thêm sản phẩm vào giỏ hàng
  add_to_cart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const product = await cartModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        responseReturn(res, 404, {
          error: "Sản phẩm đã tồn tại trong giỏ hàng!",
        });
      } else {
        const product = await cartModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, {
          message: "Thêm vào giỏ hàng thành công!",
          product,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //2. Lấy danh sách sản phẩm trong giỏ hàng
  get_cart_products = async(req, res) => {
    console.log("first")
  }
}

module.exports = new cartController();
