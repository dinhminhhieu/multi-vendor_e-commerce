import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import orderReducer from "./Reducers/orderReducer";
import paymentReducer from "./Reducers/paymentReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  order: orderReducer,
  payment: paymentReducer,
};

export default rootReducer;
