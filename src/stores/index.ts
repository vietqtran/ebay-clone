import { persistReducer, persistStore } from 'redux-persist'

import { PersistConfig } from 'redux-persist/es/types'
import { authSlice } from './auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { countrySlice } from './country/countrySlice'
import sessionStorage from 'redux-persist/es/storage/session'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig<any> = {
   key: 'root',
   storage: sessionStorage
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer)
const persistedCountryReducer = persistReducer(
   persistConfig,
   countrySlice.reducer
)

const store = configureStore({
   reducer: {
      auth: persistedAuthReducer,
      country: persistedCountryReducer
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export { store, persistor }
