import homeReducer from "./Reducers/homeReducer";
import authReducer from "./Reducers/authReducer";
import cartReducer from "./Reducers/cartReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
};

export default rootReducer;
