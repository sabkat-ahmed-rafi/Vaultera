import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
 

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['auth.decryptedVaultKey'],
          ignoredActionPaths: ['payload'], 
        },
      }),
});


// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;