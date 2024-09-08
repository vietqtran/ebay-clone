import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from '@/types/user'

interface AuthState {
   currentRegisterForm: 'personal' | 'business'
   user: Omit<User, 'hashed_password'> | null
}

const initialState: AuthState = {
   currentRegisterForm: 'personal',
   user: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCurrentRegisterForm(
         state,
         action: PayloadAction<{
            currentRegisterForm: 'personal' | 'business'
         }>
      ) {
         return { ...state, ...action.payload }
      },

      setUser(
         state,
         action: PayloadAction<Omit<User, 'hashed_password'> | null>
      ) {
         return { ...state, user: action.payload }
      }
   }
})

export const { setCurrentRegisterForm, setUser } = authSlice.actions
export { authSlice }
