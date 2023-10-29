const customerModel = require("../../models/customerModel");
const sellerToCustomerModel = require("../../models/chat/sellerToCustomerModel");
const {responseReturn} = require("../../utils/response")
const {createToken} = require("../../utils/token")
const bcrypt = require("bcrypt");

class customerAuthController {
  //1. Khách hàng đăng ký tài khoản
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email đã tồn tại!" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        await sellerToCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Đăng ký thành công!", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //2. Khách hàng đăng nhập tài khoản
  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: "Đăng nhập thành công!", token });
        } else {
          responseReturn(res, 404, { error: "Sai mật khẩu!" });
        }
      } else {
        responseReturn(res, 404, { error: "Email không tồn tại!" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //3. Khách hàng đăng xuất
  logout = async (req, res) => {
    try {
      res.cookie("customerToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: "Đăng xuất thành công!" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new customerAuthController()