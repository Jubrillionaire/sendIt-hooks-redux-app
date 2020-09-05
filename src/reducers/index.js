import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";

export default combineReducers({
  profile: profileReducer,
  auth: authReducer
});
