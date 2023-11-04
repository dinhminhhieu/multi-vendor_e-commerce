const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerToCustomerModel = require("../../models/chat/sellerToCustomerModel");
const sellerToCustomerMessage = require("../../models/chat/sellerToCustomerMessage");
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
  send_message_seller = async(req, res) => {
    // console.log(req.body)
    const { customerId, text, sellerId, name } = req.body;
    try {
        const message = await sellerToCustomerMessage.create({
          senderId: customerId,
          senderName: name,
          receverId: sellerId,
          message: text,
        });

        const data = await sellerToCustomerModel.findOne({myId: customerId})
        let myFriends = data.myFriends;
        let index = myFriends.findIndex(f => f.fdId === sellerId)
        while (index > 0) {
            let temp = myFriends[index]
            myFriends[index] = myFriends[index - 1];
            myFriends[index - 1] = temp;
            index--;
        }

        await sellerToCustomerModel.updateOne(
            {
                myId: customerId
            }, {
                myFriends
            }
        )

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
  }
}

module.exports = new chatController();
