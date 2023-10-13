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
    const co = 5;
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
        const { price, discount } = quantityProduct[i].products[0];
        // Tính toán giá sản phẩm dựa trên số lượng (quantity), giá gốc (price), và tỷ lệ giảm giá (discount)
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      }
      // Tính toán giá sản phẩm từ nhiều seller khác nhau
      let p = [];
      let unique = [
        ...new Set(quantityProduct.map((p) => p.products[0].sellerId.toString())),
      ];
      for (let i = 0; i < unique.length; i++) {
        let price = 0;
        for (let j = 0; j < quantityProduct.length; j++) {
          const tempProduct = quantityProduct[j].products[0];
          if (unique[i] === tempProduct.sellerId.toString()) {
            let pri = 0;
            if (tempProduct.discount !== 0) {
              pri =
                tempProduct.price -
                Math.floor((tempProduct.price * tempProduct.discount) / 100);
            } else {
              pri = tempProduct.price;
            }
            pri = pri - Math.floor((pri * co) / 100);
            price = price + pri * quantityProduct[j].quantity;
            p[i] = {
              sellerId: unique[i],
              shopName: tempProduct.shopName,
              price,
              products: p[i]
                ? [
                    ...p[i].products,
                    {
                      _id: quantityProduct[j]._id,
                      quantity: quantityProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ]
                : [
                    {
                      _id: quantityProduct[j]._id,
                      quantity: quantityProduct[j].quantity,
                      productInfo: tempProduct,
                    },
                  ],
            };
          }
        }
      }
      responseReturn(res, 200, {
        cart_products: p,
        price: calculatePrice,
        cart_product_count,
        shipping_fee: 30000 * p.length,
        outOfStockProduct,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new cartController();
