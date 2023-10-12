import homeReducer from "./Reducers/homeReducer";
import authReducer from "./Reducers/authReducer";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
};

export default rootReducer;
