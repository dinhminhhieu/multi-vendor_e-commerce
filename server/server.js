const express = require("express");
const { dbConnect } = require("./utils/db");
const app = express();
const cors = require("cors"); // Cơ chế cho phép hoặc từ chối các yêu cầu từ các tên miền khác nhau trên web
const http = require("http")
const socket = require("socket.io")
const bodyParser = require("body-parser"); // Trích xuất dữ liệu từ phần thân (body) của yêu cầu HTTP có chứa dữ liệu từ máy khách
const cookieParser = require("cookie-parser"); // Lưu trữ thông tin trên máy khách và gửi nó lại cho máy chủ trong mỗi yêu cầu HTTP
require("dotenv").config();

const server = http.createServer(app)

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // Kiểm tra xem các yêu cầu có chứa thông tin xác thực như cookie hay không
  })
);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

var allCustomer = []

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some(u => u.customerId === customerId)
  if(!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo
    })
  }
}

io.on("connection", (soc) => {
  console.log("socket.io server is connected...")

  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo)
    //console.log(allCustomer)
  });
})

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api/home", require("./routes/home/homeRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/home/cartRotes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/paymentRoutes"));
app.use("/api", require("./routes/dashboard/dashboardRoutes"));
app.use("/api", require("./routes/chatRoutes"));

const port = process.env.PORT; // Lấy giá trị cổng từ biến môi trường
dbConnect();
server.listen(port, () => console.log(`Server is running on port ${port}!`));
