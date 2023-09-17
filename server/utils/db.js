const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
  } catch (error) {
    console.log(error.message);
  }
};
