import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
const middleware = [thunk];
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducer, {}, enhancer);

export { store };

// import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistCombineReducers } from "redux-persist";
// import createSensitiveStorage from "redux-persist-sensitive-storage";
// import thunk from "redux-thunk";

// const storage = createSensitiveStorage({
//   keychainService: "myKeychain",
//   sharedPreferencesName: "mySharedPrefs"
// });

// const config = {
//   key: "root",
//   storage
// };

// import counterReducer from "./reducers/counterReducer";
// import bags from "./reducers/bags";
// import user from "./reducers/user";

// const rootReducer = persistCombineReducers(config, {
//   counterReducer,
//   bags,
//   user
// });

// export let store = createStore(rootReducer, applyMiddleware(thunk));
// export let persistor = persistStore(store);
