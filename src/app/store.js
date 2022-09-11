import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composedEnhancer);
export const persistor = persistStore(store);
