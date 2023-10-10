const express = require("express");
const { dbConnect } = require("./utils/db");
const app = express();
const cors = require("cors"); // Cơ chế cho phép hoặc từ chối các yêu cầu từ các tên miền khác nhau trên web
const bodyParser = require("body-parser"); // Trích xuất dữ liệu từ phần thân (body) của yêu cầu HTTP có chứa dữ liệu từ máy khách
const cookieParser = require("cookie-parser"); // Lưu trữ thông tin trên máy khách và gửi nó lại cho máy chủ trong mỗi yêu cầu HTTP

// config
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, // Kiểm tra xem các yêu cầu có chứa thông tin xác thực như cookie hay không
  })
);
app.use(bodyParser.json());
app.use(cookieParser())
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api/home", require("./routes/home/homeRoutes"));

const port = process.env.PORT; // Lấy giá trị cổng từ biến môi trường
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}!`));
