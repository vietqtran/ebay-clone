import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
   RegisterBusinessCredentials,
   RegisterPersonalCredentials,
   User
} from '@/types/user'

interface AuthState {
   currentRegisterForm: 'personal' | 'business'
   user: Omit<User, 'hashed_password'> | null
   unverifiedUser: Omit<User, 'hashed_password'> | null
   businessRegisterForm: Partial<
      RegisterBusinessCredentials & RegisterPersonalCredentials
   > | null
   OTPCountDown: number
   OTPEncrypted: string | null
}

const initialState: AuthState = {
   currentRegisterForm: 'personal',
   user: null,
   unverifiedUser: null,
   businessRegisterForm: null,
   OTPCountDown: 15,
   OTPEncrypted: null
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
      setUnverifiedUser(
         state,
         action: PayloadAction<Omit<User, 'hashed_password'> | null>
      ) {
         return { ...state, unverifiedUser: action.payload }
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
      },
      setOTPCountDown(state, action: PayloadAction<number>) {
         return { ...state, OTPCountDown: action.payload }
      },
      setOTPEncrypted(state, action: PayloadAction<string | null>) {
         return { ...state, OTPEncrypted: action.payload }
      }
   }
})

export const {
   setCurrentRegisterForm,
   setUser,
   setUnverifiedUser,
   setBusinessRegisterForm,
   setOTPCountDown,
   setOTPEncrypted
} = authSlice.actions
export { authSlice }
