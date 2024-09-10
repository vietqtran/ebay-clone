import React, { useEffect } from 'react'
import {
   setOTPCountDown,
   setOTPEncrypted,
   setUnverifiedUser,
   setUser
} from '@/stores/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import CryptoJS from 'crypto-js'
import OtpInput from 'react-otp-input'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

type Props = {}

const COUNTDOWN_DURATION = 15

const VerifiedAccount = (props: Props) => {
   const { push, replace } = useRouter()
   const dispatch = useAppDispatch()
   const { verifyUser, redirectToVerifyEmail } = useAuth()
   const { unverifiedUser } = useAppSelector(state => state.auth)
   const { OTPCountDown, OTPEncrypted } = useAppSelector(state => state.auth)
   const [otp, setOtp] = React.useState('')

   useEffect(() => {
      if (!OTPEncrypted) {
         return replace('/signin')
      }
   }, [OTPEncrypted])

   useEffect(() => {
      const countdown = setInterval(() => {
         if (OTPCountDown > 0) {
            dispatch(setOTPCountDown(OTPCountDown - 1))
         }
      }, 1000)

      return () => clearInterval(countdown)
   }, [OTPCountDown, dispatch])

   const handleResendOtp = async () => {
      if (OTPCountDown > 0) return
      dispatch(setOTPCountDown(COUNTDOWN_DURATION))
      await redirectToVerifyEmail(unverifiedUser?.email!)
   }

   const handleVerifyOtp = async () => {
      const bytes = CryptoJS.AES.decrypt(
         OTPEncrypted!,
         process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!
      )
      const decryptedOtp = bytes.toString(CryptoJS.enc.Utf8)
      if (otp === decryptedOtp) {
         await verifyUser(unverifiedUser?.email!)
         dispatch(setUser(unverifiedUser))
         dispatch(setUnverifiedUser(null))
         push('/')
         setTimeout(() => {
            dispatch(setOTPEncrypted(null))
         }, 300)
      } else {
         toast.error('Please enter the correct OTP')
      }
   }

   const handleCancel = () => {
      dispatch(setOTPCountDown(0))
      dispatch(setOTPEncrypted(null))
      push('/signin')
   }

   return OTPEncrypted ? (
      <div className="flex w-full flex-col items-center gap-7">
         <h1 className="whitespace-nowrap text-lg font-bold md:text-2xl">
            Verify your email address
         </h1>
         <div className="flex w-full flex-col items-center">
            <span className="text-sm">We emailed a security code to</span>
            <span className="text-sm font-semibold">
               {unverifiedUser?.email}
            </span>
            <span className="text-sm">
               If you can&apos;t find it, check your spam folder.{' '}
               <span className="cursor-pointer text-blue-500 underline">
                  Wrong email?
               </span>
            </span>
         </div>
         <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{
               justifyContent: 'center',
               display: 'flex',
               alignItems: 'center',
               gap: '12px'
            }}
            inputStyle={{
               width: '48px',
               height: '48px',
               borderRadius: '4px',
               border: '1px solid #ccc',
               outline: 'none'
            }}
            shouldAutoFocus
            inputType="number"
            renderInput={props => <input {...props} />}
         />
         <div className="grid w-full grid-cols-2 gap-[18px]">
            <button
               onClick={handleCancel}
               className="h-12 w-full rounded-full border-[1px] border-blue-500 bg-transparent text-sm text-blue-500 duration-75 ease-linear active:scale-95"
            >
               Cancel
            </button>
            <button
               onClick={handleVerifyOtp}
               disabled={otp.length !== 6}
               className={twMerge(
                  'h-12 rounded-full active:scale-95 disabled:transform-none duration-75 ease-linear disabled:cursor-not-allowed bg-neutral-400 text-sm font-semibold text-white',
                  otp.length === 6 && 'bg-blue-500 hover:bg-blue-600'
               )}
            >
               Verify
            </button>
         </div>
         <span className="text-sm">
            Still no code?{` `}
            <span
               onClick={handleResendOtp}
               className={twMerge(
                  'cursor-pointer text-blue-500 underline',
                  OTPCountDown > 0 && 'cursor-not-allowed text-[#707070]'
               )}
            >
               Get another one
            </span>
            {OTPCountDown > 0 && (
               <span>
                  {` `}
                  in {OTPCountDown}s
               </span>
            )}
         </span>
      </div>
   ) : null
}

export default VerifiedAccount
