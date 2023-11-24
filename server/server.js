const express = require("express");
const { dbConnect } = require("./utils/db");
const app = express();
const cors = require("cors"); // Cơ chế cho phép hoặc từ chối các yêu cầu từ các tên miền khác nhau trên web
const http = require("http");
const bodyParser = require("body-parser"); // Trích xuất dữ liệu từ phần thân (body) của yêu cầu HTTP có chứa dữ liệu từ máy khách
const cookieParser = require("cookie-parser"); // Lưu trữ thông tin trên máy khách và gửi nó lại cho máy chủ trong mỗi yêu cầu HTTP
require("dotenv").config();
const socket = require("socket.io");

const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // Kiểm tra xem các yêu cầu có chứa thông tin xác thực như cookie hay không
  })
);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

var allCustomer = [];
var allSeller = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

let admin = {};

const removeAdmin = (socketId) => {
  if (admin.socketId === socketId) {
    admin = {};
  }
};

io.on("connection", (soc) => {
  console.log("socket.io server is connected...");

  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    //console.log(allCustomer)
  });

  soc.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, soc.id, userInfo);
    //console.log(userInfo)
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeAdmin", { status: true });
  });

    soc.on("add_admin", (adminInfo) => {
      // console.log(adminInfo);
      delete adminInfo.email;
      admin = adminInfo;
      admin.socketId = soc.id;
      io.emit("activeSeller", allSeller);
      io.emit("activeAdmin", { status: true });
    });

  soc.on("send_message_seller", (message) => {
    const customer = findCustomer(message.receverId);
    // console.log(customer)
    if (customer !== undefined) {
      soc.to(customer.socketId).emit("seller_message", message);
    }
  });

  soc.on("send_message_customer", (message) => {
    const seller = findSeller(message.receverId);
    //console.log(seller)
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("customer_message", message);
    }
  });

  soc.on("send_message_admin_to_seller", (message) => {
    const seller = findSeller(message.receverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("receved_admin_message", message);
    }
  });

  soc.on("send_message_seller_to_admin", (message) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit("receved_seller_message", message);
    }
  });

  soc.on("disconnect", () => {
    console.log("user disconnect...");
    remove(soc.id);
    removeAdmin(soc.id);
    io.emit("activeAdmin", { status: false });
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});

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
