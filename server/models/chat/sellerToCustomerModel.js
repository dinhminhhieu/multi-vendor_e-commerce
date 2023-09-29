const { Schema, model } = require("mongoose");

const sellerToCustomerSchema = new Schema(
  {
    myId: {
      type: String,
      require: true,
    },
    myFriends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("seller_customers", sellerToCustomerSchema);
