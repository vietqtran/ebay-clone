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
import { setLoadingFullScreen } from '@/stores/common/commonSlice'

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

         const isPasswordMatch = comparePassword(
            loginCredentials.password,
            user?.hashed_password as string
         )
         if (!isPasswordMatch) {
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
         const passwordHashed = hashPassword(
            registerPersonalCredentials.password
         )
         const { data, error } = await supabase
            .from('users')
            .insert({
               first_name: registerPersonalCredentials.first_name,
               last_name: registerPersonalCredentials.last_name,
               email: registerPersonalCredentials.email,
               provider: registerPersonalCredentials.provider,
               hashed_password: passwordHashed
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
      dispatch(setLoadingFullScreen(true))
      try {
         const OTP = generateOTP()
         await sendOtpEmail(email, OTP)
         const encryptedOtp = CryptoJS.AES.encrypt(
            OTP,
            process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!
         ).toString()
         console.log(OTP)
         dispatch(setOTPEncrypted(encryptedOtp))
         push('/verify')
      } catch (error) {
         console.error('Error redirecting to verify email', error)
      } finally {
         dispatch(setLoadingFullScreen(false))
      }
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

   const changeRegisteredEmail = async (oldEmail: string, email: string) => {
      try {
         const existedUser = await findExistingUser(email)
         if (existedUser) {
            toast.error('Email already exists')
            throw new Error('Email already exists')
         }
         const { data, error } = await supabase
            .from('users')
            .update({ email: email })
            .eq('email', oldEmail)
            .select('*')
         if (error) {
            toast.error(error.message)
            throw new Error(error.message)
         }
         return data[0] as User
      } catch (error) {
         throw new Error()
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

   const hashPassword = (password: string) => {
      try {
         const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!
         )
         return encryptedPassword.toString()
      } catch (error) {
         console.error('Error hashing password', error)
      }
   }

   const comparePassword = (password: string, hashedPassword: string) => {
      try {
         const decryptedPassword = CryptoJS.AES.decrypt(
            hashedPassword,
            process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!
         ).toString(CryptoJS.enc.Utf8)
         return decryptedPassword === password
      } catch (error) {
         console.error('Error comparing password', error)
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
      redirectToVerifyEmail,
      changeRegisteredEmail
   }
}
