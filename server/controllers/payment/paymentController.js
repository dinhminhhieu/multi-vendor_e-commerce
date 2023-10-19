const stripeModel = require("../../models/stripeModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51O2qq4DfL3StjNhv6m2WDvEl2YXFACBoufn2fVRbSgrNoxZ0sRREOlKjBxTT9gaNVMQPXAENAQVCWoY6Kr4XVawM00UjJ2WXe7"
);
const { responseReturn } = require("../../utils/response");
const sellerModel = require("../../models/sellerModel");

class paymentComtroller {
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

  active_stripe_connect_account = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await stripeModel.findOne({ code: activeCode });
      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, {
          payment: "active",
        });
        responseReturn(res, 200, { message: "payment active" });
      } else {
        responseReturn(res, 404, { message: "payment active failed" });
      }
    } catch (error) {
      responseReturn(res, 500, { message: "Internal server error" });
    }
  };
}

module.exports = new paymentComtroller();
