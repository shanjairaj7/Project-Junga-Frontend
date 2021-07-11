import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import userSlice from "./reduxSlices/userSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  user: userSlice,
});

export { rootPersistConfig, rootReducer };
