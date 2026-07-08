import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  createMigrate,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "@/features/theme/themeSlice";
import flightReducer from "@/features/flights";

import { flightsApi } from "@/services/flightsApiSlice";
import { airlabsApi } from "@/services/airlabsApiSlice";
import { airportApi } from "@/services/airportApiSlice";

const rootReducer = combineReducers({
  flights: flightReducer,
  theme: themeReducer,

  [flightsApi.reducerPath]: flightsApi.reducer,
  [ airlabsApi.reducerPath]:  airlabsApi.reducer,
  [airportApi.reducerPath]: airportApi.reducer,
});

// Migrations run when the persisted version is older than `version` below.
// Each key is the version you're migrating FROM.
const migrations = {
  0: (state: any) => ({
    ...state,
    flights: {
      ...state?.flights,
      flightDetailsCache: state?.flights?.flightDetailsCache ?? {},
    },
  }),
  1: (state: any) => ({
    ...state,
    flights: {
      ...state?.flights,
      boundingBox: state?.flights?.boundingBox ?? null,
    },
  }),
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["flights", "theme"],
  version: 2,
  migrate: createMigrate(migrations, { debug: false }),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(flightsApi.middleware)
      .concat( airlabsApi.middleware)
      .concat(airportApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;