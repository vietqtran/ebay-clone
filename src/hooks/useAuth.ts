import { signInWithPopup } from 'firebase/auth'

import { User } from '@/types/user'
import { auth, facebookProvider, googleProvider } from '@/utils/firebase'
import { setUser } from '@/stores/auth/authSlice'
import { useAppDispatch } from './useRedux'

export const useAuth = () => {
   const dispatch = useAppDispatch()

   const signInWithGoogle = async () => {
      try {
         const response = await signInWithPopup(auth, googleProvider)
         if (response.user) {
            const user: User = {
               avatarUrl: response.user.photoURL ?? '',
               email: response.user.email ?? '',
               id: response.user.uid,
               name: response.user.displayName ?? ''
            }
            dispatch(setUser(user))
         }
         throw new Error('Error signing in with Google')
      } catch (error) {
         console.error('Error signing in with Google', error)
      }
   }

   const signInWithFacebook = async () => {
      try {
         const response = await signInWithPopup(auth, facebookProvider)
         if (response.user) {
            console.log(response.user)
         }
         throw new Error('Error signing in with Facebook')
      } catch (error) {
         console.error('Error signing in with Facebook', error)
      }
   }

   return {
      signInWithGoogle,
      signInWithFacebook
   }
}
