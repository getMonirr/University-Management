import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { baseAPI } from "./api/baseAPI";
import { authReducer } from "./features/auth/authSlice";

import storage from "redux-persist/lib/storage";

// redux persist
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    // base api
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedAuthReducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

export const reduxStore = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
