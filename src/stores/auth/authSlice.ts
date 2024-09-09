import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
   RegisterBusinessCredentials,
   RegisterPersonalCredentials,
   User
} from '@/types/user'

interface AuthState {
   currentRegisterForm: 'personal' | 'business'
   user: Omit<User, 'hashed_password'> | null
   businessRegisterForm: Partial<
      RegisterBusinessCredentials & RegisterPersonalCredentials
   > | null
}

const initialState: AuthState = {
   currentRegisterForm: 'personal',
   user: null,
   businessRegisterForm: null
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
      },
      setBusinessRegisterForm(
         state,
         action: PayloadAction<Partial<
            RegisterBusinessCredentials & RegisterPersonalCredentials
         > | null>
      ) {
         return {
            ...state,
            businessRegisterForm: {
               ...state.businessRegisterForm,
               ...action.payload
            }
         }
      }
   }
})

export const { setCurrentRegisterForm, setUser, setBusinessRegisterForm } =
   authSlice.actions
export { authSlice }
