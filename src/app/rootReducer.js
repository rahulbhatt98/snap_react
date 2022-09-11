import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import advertisementReducer from "../features/reducers/advertisementReducer"
import supportReducer from "../features/reducers/supportReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  advertisement:advertisementReducer,
  support:supportReducer
});

export default rootReducer;