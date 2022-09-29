import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qaListReducer, { addQA } from "../features/qaSlice";
import developerListReducer, { addDev } from "../features/developerSlice";

import {
  createStateSyncMiddleware,
  withReduxStateSync,
  initMessageListener,
} from "redux-state-sync";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const config = {
  chanel: "gago",
};

const rootReducer = combineReducers({
  qa: qaListReducer,
  developer: developerListReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const someMiddle = createStateSyncMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(someMiddle),
});

initMessageListener(store);
// export const persister = persistStore(store);
export const withState = withReduxStateSync(store);
export default store;
