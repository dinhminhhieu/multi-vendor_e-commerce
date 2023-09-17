const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { responseReturn } = require("../utils/response");
const { createToken } = require("../utils/token");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password); // Kiểm tra mật khẩu
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, success: "Đăng nhập thành công!" });
        } else {
          responseReturn(res, 500, { error: "Sai mật khẩu!" });
        }
      } else {
        responseReturn(res, 500, { error: "Không tìm thấy email!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role == "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("seller info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authControllers();
