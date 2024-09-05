import { persistReducer, persistStore } from 'redux-persist'

import { PersistConfig } from 'redux-persist/es/types'
import { authSlice } from './auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig<any> = {
   key: 'root',
   storage
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

const store = configureStore({
   reducer: {
      auth: persistedReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export { store, persistor }
