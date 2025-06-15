import { combineReducers, configureStore } from "@reduxjs/toolkit"
import adminReducer from "@/slices/adminSlice"
import storage from "@/lib/noopStorage" // ⛔ This should fallback to noopStorage only on server

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

// 👇 Persist config
const persistConfig = {
  key: "root",
  storage, // Must work in client — see note below!
  whitelist: ["admin"], // Only persist admin slice
}

// 👇 Combine reducers
const rootReducer = combineReducers({
  admin: adminReducer,
})

// 👇 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 👇 Create store with middleware fix for redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 👇 Persistor instance
export const persistor = persistStore(store)

// 🔧 Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
