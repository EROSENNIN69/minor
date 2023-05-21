import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import filterSlice from "./filterSlice";
import propertiesSlice from "./propertiesSlice";
import themeSlice from "./themeSlice";
import utilitiesSlice from "./utilitiesSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: 'minorProject',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    property: propertiesSlice,
    theme: themeSlice,
    utils: utilitiesSlice,
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export let persistor = persistStore(store);