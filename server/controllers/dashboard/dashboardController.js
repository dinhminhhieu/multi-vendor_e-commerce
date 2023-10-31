const authOrder = require("../../models/authOrder");
const sellerWallet = require("../../models/sellerWallet");
const productModel = require("../../models/productModel");
const customerOrder = require("../../models/customerOrder");
const snapdealWallet = require("../../models/snapdealWallet");
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");

//1. Lấy dữ liệu dashboard cho seller
module.exports.get_seller_dashboard_data = async (req, res) => {
  const { id } = req;

  try {
    const totalSales = await sellerWallet.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalProduct = await productModel
      .find({
        sellerId: new ObjectId(id),
      })
      .countDocuments();

    const totalOrder = await authOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .countDocuments();

    const totalPendingOrder = await authOrder
      .find({
        $and: [
          {
            sellerId: {
              $eq: new ObjectId(id),
            },
          },
          {
            delivery_status: {
              $eq: "pending",
            },
          },
        ],
      })
      .countDocuments();

    const recentOrders = await authOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .limit(5);

    responseReturn(res, 200, {
      totalSale: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
      totalOrder,
      totalPendingOrder,
      totalProduct,
      recentOrders,
    });
  } catch (error) {
    console.log("get seller dashboard data error " + error.messages);
  }
};

//2. Lấy dữ liệu dashboard cho admin
module.exports.get_admin_dashboard_data = async (req, res) => {
  const { id } = req;
  try {
    const totalSele = await snapdealWallet.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalProduct = await productModel.find({}).countDocuments();

    const totalOrder = await customerOrder.find({}).countDocuments();

    const totalSeller = await sellerModel.find({}).countDocuments();

    const recentOrders = await customerOrder.find({}).limit(5);

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
      totalSeller,
      recentOrders,
      totalProduct,
    });
  } catch (error) {
    console.log("get admin dashboard data error " + error.messages);
  }
};
