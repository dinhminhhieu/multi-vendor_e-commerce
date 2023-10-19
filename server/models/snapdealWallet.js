const { Schema, model } = require("mongoose");

const snapdealWalletSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

module.exports = model("snapdealWallets", snapdealWalletSchema)