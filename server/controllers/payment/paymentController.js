const stripeModel = require("../../models/stripeModel");
const sellerWallet = require("../../models/sellerWallet");
const sellerModel = require("../../models/sellerModel");
const snapdealWallet = require("../../models/snapdealWallet");
const withdrawRequest = require("../../models/withdrawRequest");
const moment = require("moment");
const {
  mongo: { ObjectId },
} = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51O62ICBURT4LOFQuwX1a0yWztoDlZ3uYd1um45cJmvgoQiBP7iTSF230OojzQkwawcOr0wd2ruFBpB4gd7d1vQRi00LVdjxZ5z"
);
const { responseReturn } = require("../../utils/response");

class paymentComtroller {
  //1. Tạo tài khoản thanh toán trên stripe
  create_stripe_connect_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
      const stripInfo = await stripeModel.findOne({ sellerId: id });

      if (stripInfo) {
        await stripeModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await stripeModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      }
    } catch (error) {
      console.log("stripe connect account create error " + error.message);
    }
  };

  //2. Kích hoạt tài khoản thanh toán
  active_stripe_connect_account = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await stripeModel.findOne({ code: activeCode });
      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, {
          payment: "active",
        });
        responseReturn(res, 200, {
          message: "Kích hoạt tài khoản thanh toán thành công!",
        });
      } else {
        responseReturn(res, 404, {
          message: "Kích hoạt tài khoản thanh toán thất bại!",
        });
      }
    } catch (error) {
      responseReturn(res, 500, { message: "Internal server error!" });
    }
  };

  //3. Tính tổng số tiền
  sumAmount = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum = sum + data[i].amount;
    }
    return sum;
  };

  //4. Lấy seller yêu cầu thanh toán
  get_seller_payment_request = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const payments = await sellerWallet.find({ sellerId });

      const pendingWithdraw = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "pending",
            },
          },
        ],
      });

      const successWithdraw = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "success",
            },
          },
        ],
      });

      const pendingAmount = this.sumAmount(pendingWithdraw);
      const withdrawAmount = this.sumAmount(successWithdraw);
      const totalAmount = this.sumAmount(payments);

      let availableAmount = 0;

      if (totalAmount > 0) {
        availableAmount = totalAmount - (pendingAmount + withdrawAmount);
      }

      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawAmount,
        availableAmount,
        successWithdraw,
        pendingWithdraw,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //5. Gửi yêu cầu rút tiền
  send_withdraw_request = async (req, res) => {
    const { amount, sellerId } = req.body;
    // console.log(req.body)
    const tempDate = moment(Date.now());
    const formattedDate = moment(tempDate).format("DD/MM/YYYY HH:mm");
    try {
      const withdraw = await withdrawRequest.create({
        sellerId,
        amount: parseInt(amount),
        date: formattedDate,
      });
      responseReturn(res, 200, {
        withdraw,
        message: "Gửi yêu cầu rút tiền thành công!",
      });
    } catch (error) {
      responseReturn(res, 500, { message: "Internal server error!" });
    }
  };

  //6. Lấy thông tin yêu cầu rút tiền
  get_withdraw_request = async (req, res) => {
    try {
      const withdraw_Request = await withdrawRequest.find({
        status: "pending",
      });
      responseReturn(res, 200, { withdraw_Request });
    } catch (error) {
      responseReturn(res, 500, { message: "Internal server error!" });
    }
  };

  //7. Xác nhận yêu cầu rút tiền
  confirm_withdraw_request = async (req, res) => {
    const { paymentId } = req.body;

    try {
      const payment = await withdrawRequest.findById(paymentId);
      const { stripeId } = await stripeModel.findOne({
        sellerId: new ObjectId(payment.sellerId),
      });

      await stripe.transfers.create({
        amount: payment.amount,
        currency: "vnd",
        destination: stripeId,
      });
      await withdrawRequest.findByIdAndUpdate(paymentId, { status: "success" });
      responseReturn(res, 200, {
        payment,
        message: "Xác nhận rút tiền thành công!",
      });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: "Internal server error" });
    }
  };
}

module.exports = new paymentComtroller();
