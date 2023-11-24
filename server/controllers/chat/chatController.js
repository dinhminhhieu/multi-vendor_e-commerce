const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerToCustomerModel = require("../../models/chat/sellerToCustomerModel");
const sellerToCustomerMessage = require("../../models/chat/sellerToCustomerMessage");
const sellerToAdminMessage = require("../../models/chat/sellerToAdminMessage");
const { responseReturn } = require("../../utils/response");

class chatController {
  //1. Lấy và hiển thị seller và customer chat
  add_friend = async (req, res) => {
    const { sellerId, customerId } = req.body;
    // console.log(req.body);
    try {
      if (sellerId !== "") {
        const seller = await sellerModel.findById(sellerId);
        const customer = await customerModel.findById(customerId);
        const checkSeller = await sellerToCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: customerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: sellerId,
                },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerToCustomerModel.updateOne(
            {
              myId: customerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  shopName: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await sellerToCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: {
                  fdId: customerId,
                },
              },
            },
          ],
        });

        if (!checkCustomer) {
          await sellerToCustomerModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                myFriends: {
                  fdId: customerId,
                  name: customer.name,
                  image: "",
                },
              },
            }
          );
        }

        const messages = await sellerToCustomerMessage.find({
          $or: [
            {
              $and: [
                {
                  receverId: { $eq: sellerId },
                },
                {
                  senderId: { $eq: customerId },
                },
              ],
            },
            {
              $and: [
                {
                  receverId: { $eq: customerId },
                },
                {
                  senderId: {
                    $eq: sellerId,
                  },
                },
              ],
            },
          ],
        });

        const MyFriends = await sellerToCustomerModel.findOne({
          myId: customerId,
        });

        const currentFd = MyFriends.myFriends.find((s) => s.fdId === sellerId);
        responseReturn(res, 200, {
          myFriends: MyFriends.myFriends,
          currentFd,
          messages,
        });
      } else {
        const MyFriends = await sellerToCustomerModel.findOne({
          myId: customerId,
        });

        responseReturn(res, 200, {
          myFriends: MyFriends.myFriends,
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  //2. Gửi tin nhắn
  send_message_seller = async (req, res) => {
    // console.log(req.body)
    const { customerId, text, sellerId, name } = req.body;
    try {
      const message = await sellerToCustomerMessage.create({
        senderId: customerId,
        senderName: name,
        receverId: sellerId,
        message: text,
      });

      const data = await sellerToCustomerModel.findOne({ myId: customerId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === sellerId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }

      await sellerToCustomerModel.updateOne(
        {
          myId: customerId,
        },
        {
          myFriends,
        }
      );

      const data1 = await sellerToCustomerModel.findOne({ myId: sellerId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === customerId);

      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerToCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends1,
        }
      );

      responseReturn(res, 201, { message });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  //3. Lấy khách hàng đang trò chuyện trả về seller
  get_customers = async (req, res) => {
    const { sellerId } = req.params;
    // console.log(sellerId)

    try {
      const data = await sellerToCustomerModel.findOne({ myId: sellerId });
      responseReturn(res, 200, { customers: data.myFriends });
    } catch (error) {
      console.log(error);
    }
  };

  //4. Lấy tin nhắn của khách hàng hiển thị qua seller
  get_customer_messages = async (req, res) => {
    const { customerId } = req.params;
    const { id } = req;
    try {
      const messages = await sellerToCustomerMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: customerId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: customerId,
                },
              },
            ],
          },
        ],
      });
      const currentCustomer = await customerModel.findById(customerId);

      responseReturn(res, 200, { messages, currentCustomer });
    } catch (error) {
      console.log(error);
    }
  };

  //5. Gửi tin nhắn từ seller sang khách hàng
  send_message_customers = async (req, res) => {
    const { senderId, text, receverId, name } = req.body;
    try {
      const message = await sellerToCustomerMessage.create({
        senderId: senderId,
        senderName: name,
        receverId: receverId,
        message: text,
      });

      const data = await sellerToCustomerModel.findOne({ myId: senderId });
      let myFriends = data.myFriends;
      let index = myFriends.findIndex((f) => f.fdId === receverId);
      while (index > 0) {
        let temp = myFriends[index];
        myFriends[index] = myFriends[index - 1];
        myFriends[index - 1] = temp;
        index--;
      }
      await sellerToCustomerModel.updateOne(
        {
          myId: senderId,
        },
        {
          myFriends,
        }
      );
      const data1 = await sellerToCustomerModel.findOne({ myId: receverId });
      let myFriends1 = data1.myFriends;
      let index1 = myFriends1.findIndex((f) => f.fdId === senderId);

      while (index1 > 0) {
        let temp1 = myFriends1[index1];
        myFriends1[index1] = myFriends[index1 - 1];
        myFriends1[index1 - 1] = temp1;
        index1--;
      }

      await sellerToCustomerModel.updateOne(
        {
          myId: receverId,
        },
        {
          myFriends1,
        }
      );

      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };

  //6. Lấy tất cả  seller đang trò chuyện trả về admin
  get_sellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      responseReturn(res, 200, { sellers });
    } catch (error) {
      console.log(error);
    }
  };

  //7. Gửi tin nhắn từ admin sang seller
  send_message_sellers_admin = async (req, res) => {
    // console.log(req.body);
    const { senderId, receverId, message, senderName } = req.body;
    try {
      const messageData = await sellerToAdminMessage.create({
        senderId,
        receverId,
        message,
        senderName,
      });
      responseReturn(res, 200, { message: messageData });
    } catch (error) {
      console.log(error);
    }
  };

  //8. Lấy tin nhắn của admin
  get_admin_messages = async (req, res) => {
    // console.log(req.params);
    const { receverId } = req.params;
    const id = "";
    try {
      const messages = await sellerToAdminMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: receverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      // console.log(messages)
      let currentSeller = {};
      if (receverId) {
        currentSeller = await sellerModel.findById(receverId);
      }
      responseReturn(res, 200, { messages, currentSeller });
    } catch (error) {
      console.log(error);
    }
  };

  //9. Lấy tin nhắn của seller
  get_seller_messages = async (req, res) => {
    const receverId = "";
    const { id } = req;
    try {
      const messages = await sellerToAdminMessage.find({
        $or: [
          {
            $and: [
              {
                receverId: { $eq: receverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receverId,
                },
              },
            ],
          },
        ],
      });
      responseReturn(res, 200, { messages });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new chatController();
