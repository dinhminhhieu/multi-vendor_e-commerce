const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerToCustomerModel = require("../../models/chat/sellerToCustomerModel");
const sellerToCustomerMessage = require("../../models/chat/sellerToCustomerMessage");
const { responseReturn } = require("../../utils/response");

class chatController {
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
}

module.exports = new chatController();
