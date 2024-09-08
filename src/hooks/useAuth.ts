import * as bcrypt from 'bcryptjs'

import {
   LoginCredentials,
   RegisterBusinessCredentials,
   RegisterPersonalCredentials,
   User
} from '@/types/user'
import { auth, facebookProvider, googleProvider } from '@/utils/firebase'

import { createClient } from '@/utils/supabase/client'
import { setUser } from '@/stores/auth/authSlice'
import { signInWithPopup } from 'firebase/auth'
import { useAppDispatch } from './useRedux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
                  dispatch(setUser(userUpdated))
               }
            } else {
               const { data, error } = await supabase
                  .from('users')
                  .insert({
                     ...user
                  })
                  .select('*')
                  .single()
               if (error) throw new Error(error.message)
               dispatch(setUser(data))
            }
            push('/')
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
            const isExisted = await findUserByEmail(user.email)
            if (isExisted) {
               const userUpdated = await updateUser(user)
               if (userUpdated) {
                  dispatch(setUser(userUpdated))
               }
            } else {
               const { data, error } = await supabase
                  .from('users')
                  .insert({
                     ...user
                  })
                  .select('*')
                  .single()
               if (error) throw new Error(error.message)
               dispatch(setUser(data))
            }
            push('/')
         }
      } catch (error) {
         console.error('Error signing in with Facebook', error)
      }
   }

   const loginWithCredentials = async (loginCredentials: LoginCredentials) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .select('*')

            .single()
         if (error) throw new Error(error.message)
         const user = data as User
         const isPasswordMatch = await comparePassword(
            loginCredentials.password,
            user.hashed_password as string
         )
         if (isPasswordMatch) {
            dispatch(setUser(user))
            push('/')
         } else {
            throw new Error('Please enter the correct password')
         }
      } catch (error) {
         console.error('Error signing in with email and password', error)
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
            throw new Error('Email already exists')
         }
         const passwordHash = await hashPassword(
            registerPersonalCredentials.password
         )
         const { data, error } = await supabase
            .from('users')
            .insert({
               first_name: registerPersonalCredentials.first_name,
               last_name: registerPersonalCredentials.last_name,
               email: registerPersonalCredentials.email,
               provider: registerPersonalCredentials.provider,
               hashed_password: passwordHash
            })
            .select('*')
            .single()
         if (error) throw new Error(error.message)
         dispatch(setUser(data))
         push('/')
      } catch (error) {
         console.error('Error registering user', error)
      } finally {
         setIsLoading(false)
      }
   }

   const findUserByEmail = async (email: string) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()
         if (error) throw new Error(error.message)
         return data as User
      } catch (error) {
         console.error('Error finding user by email', error)
      }
   }

   const updateUser = async (user: User) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .update({
               ...user
            })
            .eq('email', user.email)
            .select('*')
            .single()
         if (error) throw new Error(error.message)
         return data as User
      } catch (error) {
         console.error('Error updating user', error)
      }
   }

   const hashPassword = async (password: string) => {
      try {
         return await bcrypt.hash(password, 10)
      } catch (error) {
         console.error('Error hashing password', error)
      }
   }

   const comparePassword = async (password: string, hash: string) => {
      try {
         return await bcrypt.compare(password, hash)
      } catch (error) {
         console.error('Error comparing password', error)
      }
   }

   return {
      isLoading,
      signInWithGoogle,
      signInWithFacebook,
      loginWithCredentials,
      registerPersonalWithCredentials
   }
}
