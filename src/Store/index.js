import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import ShopApp from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "reducer",
  storage: storage,
  whitlist: ["Carts"],
};

const persistedReducer = persistReducer(persistConfig, ShopApp);

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const configStore = (initialState = {}) => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();
global.store = store;

export { store, persistor };
