import homeReducer from "./Reducers/homeReducer";
import authReducer from "./Reducers/authReducer";
import cartReducer from "./Reducers/cartReducer";
import orderReducer from "./Reducers/orderReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import chatReducer from "./Reducers/chatReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
};

export default rootReducer;
