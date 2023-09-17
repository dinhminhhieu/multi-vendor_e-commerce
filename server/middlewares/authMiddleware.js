const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(409).json({
      error: "Xin hãy đăng nhập trước khi thực hiện!",
    });
  } else {
    try {
      const deCodeToken = await jwt.verify(accessToken, process.env.SECRET_KEY);
      req.role = deCodeToken.role;
      req.id = deCodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({
        error: "Token hết hạn, hãy đăng nhập lại",
      });
    }
  }
};
