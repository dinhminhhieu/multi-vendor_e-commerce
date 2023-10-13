const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");

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
  get_cart_products = async (req, res) => {
    const { userId } = req.params;
    try {
      // Truy vấn tập hợp
      const cart_products = await cartModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let calculatePrice = 0;
      let cart_product_count = 0;
      
      // Hết hàng
      const outOfStockProduct = cart_products.filter(
        (p) => p.products[0].quantity < p.quantity
      );
      for (let i = 0; i < outOfStockProduct.length; i++) {
        cart_product_count = cart_product_count + outOfStockProduct[i].quantity;
      }

      // Còn sản phẩm
      const quantityProduct = cart_products.filter(
        (p) => p.products[0].quantity >= p.quantity
      );
      for (let i = 0; i < quantityProduct.length; i++) {
        const { quantity } = quantityProduct[i];
        cart_product_count = cart_product_count + quantity;
        const {price, discount} = quantityProduct[i].products[0]

      }
      

    } catch (error) {}
  };
}

module.exports = new cartController();
