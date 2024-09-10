import argon2 from 'argon2'

import {
   LoginCredentials,
   RegisterPersonalCredentials,
   User
} from '@/types/user'
import { auth, facebookProvider, googleProvider } from '@/utils/firebase'
import {
   setBusinessRegisterForm,
   setOTPEncrypted,
   setUnverifiedUser,
   setUser
} from '@/stores/auth/authSlice'

import CryptoJS from 'crypto-js'
import { createClient } from '@/utils/supabase/client'
import { generateOTP } from '@/helpers'
import { signInWithPopup } from 'firebase/auth'
import { toast } from 'sonner'
import { useAppDispatch } from './useRedux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { sendOtpEmail } from '@/utils/mail/send-mail'

export const useAuth = () => {
   const { push } = useRouter()
   const dispatch = useAppDispatch()
   const supabase = createClient()
   const [isLoading, setIsLoading] = useState(false)

   const signInWithGoogle = async () => {
      try {
         const response = await signInWithPopup(auth, googleProvider)
         if (response.user) {
            const user: Omit<User, 'hashed_password'> = {
               avatar_url: response.user.photoURL ?? '',
               email: response.user.email ?? '',
               name: response.user.displayName ?? '',
               provider: 'google'
            }
            const isExisted = await findUserByEmail(user.email)
            if (isExisted) {
               const userUpdated = await updateUser(user)
               if (userUpdated) {
                  if (!userUpdated.is_verified) {
                     dispatch(setUnverifiedUser(userUpdated))
                     await redirectToVerifyEmail(userUpdated.email)
                  } else {
                     dispatch(setUser(userUpdated))
                     push('/')
                  }
               }
            } else {
               const { data, error } = await supabase
                  .from('users')
                  .insert(user)
                  .select('*')
               if (error) {
                  toast.error(error.message)
                  throw new Error(error.message)
               }
               const createdUser = data[0] as User
               dispatch(setUnverifiedUser(createdUser))
               await redirectToVerifyEmail(createdUser.email)
            }
         }
      } catch (error) {
         console.error('Error signing in with Google', error)
      }
   }

   const signInWithFacebook = async () => {
      try {
         const response = await signInWithPopup(auth, facebookProvider)
         if (response.user) {
            const user: Omit<User, 'hashed_password'> = {
               avatar_url: response.user.photoURL ?? '',
               email: response.user.email ?? '',
               name: response.user.displayName ?? '',
               provider: 'facebook'
            }
            const existingUser = await findExistingUser(user.email)
            if (existingUser) {
               const userUpdated = await updateUser(user)
               if (userUpdated) {
                  if (!userUpdated.is_verified) {
                     dispatch(setUnverifiedUser(userUpdated))
                     await redirectToVerifyEmail(userUpdated.email)
                  } else {
                     dispatch(setUser(userUpdated))
                     push('/')
                  }
               }
            } else {
               const { data, error } = await supabase
                  .from('users')
                  .insert(user)
                  .select('*')
               if (error) {
                  toast.error(error.message)
                  throw new Error(error.message)
               }
               const createdUser = data[0] as User
               dispatch(setUnverifiedUser(createdUser))
               await redirectToVerifyEmail(createdUser.email)
            }
         }
      } catch (error) {
         console.error('Error signing in with Facebook', error)
         toast.error('Error signing in with Facebook')
      }
   }

   const loginWithCredentials = async (loginCredentials: LoginCredentials) => {
      setIsLoading(true)
      try {
         const user = await findUserByEmail(loginCredentials.email)

         const isPasswordMatch = await fetch('/api/auth/verify-password', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               hashed_password: user?.hashed_password,
               password: loginCredentials.password
            })
         })
         const compareResult = await isPasswordMatch.json()
         if (!compareResult.isMatch) {
            toast.error('Please enter the correct password')
            throw new Error('Please enter the correct password')
         }

         if (!user?.is_verified) {
            dispatch(setUnverifiedUser(user!))
            await redirectToVerifyEmail(user?.email!)
         } else {
            dispatch(setUser(user))
            push('/')
         }
      } catch (error) {
         console.error('Error signing in with email and password', error)
      } finally {
         setIsLoading(false)
      }
   }

   const registerPersonalWithCredentials = async (
      registerPersonalCredentials: RegisterPersonalCredentials
   ) => {
      setIsLoading(true)
      try {
         const isExisted = await findUserByEmail(
            registerPersonalCredentials.email
         )
         if (isExisted) {
            toast.error('Email already exists')
            throw new Error('Email already exists')
         }

         const passwordHash = await fetch('/api/auth/hash-password', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               password: registerPersonalCredentials.password
            })
         })
         const passwordHashRes = await passwordHash.json()

         const { data, error } = await supabase
            .from('users')
            .insert({
               first_name: registerPersonalCredentials.first_name,
               last_name: registerPersonalCredentials.last_name,
               email: registerPersonalCredentials.email,
               provider: registerPersonalCredentials.provider,
               hashed_password: passwordHashRes.hash
            })
            .select('*')
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         const createdUser = data[0] as User
         dispatch(setUnverifiedUser(createdUser))
         await redirectToVerifyEmail(createdUser.email)
      } catch (error) {
         console.error('Error registering user', error)
      } finally {
         setIsLoading(false)
      }
   }

   const registerBusinessStep1 = async (
      country: string,
      email: string,
      business_name: string,
      password: string
   ) => {
      setIsLoading(true)
      try {
         const isExistedEmail = await findUserByEmail(email)
         if (isExistedEmail) {
            toast.error('Email already exists')
            throw new Error('Email already exists')
         }
         dispatch(
            setBusinessRegisterForm({ country, email, business_name, password })
         )
      } catch (error) {
         console.error('Error registering user', error)
      } finally {
         setIsLoading(false)
      }
   }

   const redirectToVerifyEmail = async (email: string) => {
      const OTP = generateOTP()
      await sendOtpEmail(email, OTP)
      const encryptedOtp = CryptoJS.AES.encrypt(
         OTP,
         process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!
      ).toString()
      console.log(OTP)
      dispatch(setOTPEncrypted(encryptedOtp))
      push('/verify')
   }

   const findUserByEmail = async (email: string) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data[0] as User
      } catch (error) {
         console.error('Error finding user by email', error)
      }
   }

   const findExistingUser = async (email: string) => {
      const isExisted = await findUserByEmail(email)
      return isExisted
   }

   const updateUser = async (user: User) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .update(user)
            .eq('email', user.email)
            .select('*')
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data[0] as User
      } catch (error) {
         console.error('Error updating user', error)
      }
   }

   const verifyUser = async (email: string) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .update({ is_verified: true })
            .eq('email', email)
            .select('*')
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data[0] as User
      } catch (error) {
         console.error('Error verifying user', error)
      }
   }

   return {
      isLoading,
      signInWithGoogle,
      signInWithFacebook,
      loginWithCredentials,
      registerPersonalWithCredentials,
      findUserByEmail,
      registerBusinessStep1,
      verifyUser,
      redirectToVerifyEmail
   }
}
