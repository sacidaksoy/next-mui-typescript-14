import { configureStore } from "@reduxjs/toolkit";
import { app } from "./features";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: app.default,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
