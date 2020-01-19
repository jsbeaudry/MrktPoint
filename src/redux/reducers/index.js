import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import bags from "./bags";
import user from "./user";

const initialState = null;

const appReducers = combineReducers({
  counterReducer,
  bags,
  user
});

const rootReducer = (state = initialState, action) => {
  return appReducers(state, action);
};

export default rootReducer;
