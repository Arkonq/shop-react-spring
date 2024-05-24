import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import { MainApi } from "./api/MainApi";

// Определение типа RootState
export type RootState = ReturnType<typeof store.getState>;

const persistedAppReducer = persistReducer(
  {
    key: "app",
    storage,
  },
  appReducer,
);

const persistedAuthReducer = persistReducer(
  {
    key: "auth",
    storage,
  },
  authReducer,
);

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    auth: persistedAuthReducer,
    [MainApi.reducerPath]: MainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      MainApi.middleware,
    ),
});

const persistor = persistStore(store);

export { store, persistor };
