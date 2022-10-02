import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qaListReducer from "../features/qaSlice";
import developerListReducer from "../features/developerSlice";
import clientsListReducer from "../features/clientsSlice";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import {
  createStateSyncMiddleware,
  withReduxStateSync,
  initMessageListener,
} from "redux-state-sync";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  qa: qaListReducer,
  developer: developerListReducer,
  client: clientsListReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const someMiddle = createStateSyncMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(someMiddle, sagaMiddleware),
});

sagaMiddleware.run(saga);

initMessageListener(store);
// export const persister = persistStore(store);
export const withState = withReduxStateSync(store);
export default store;
