import Input from '@/components/common/Input'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
   changeUnverifiedEmail,
   setUnverifiedUser
} from '@/stores/auth/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

type Props = {
   returnOtp: () => void
}

export const schema = z.object({
   email: z
      .string()
      .min(1, 'Please enter your email address.')
      .email('Invalid email address.')
})

type FormData = z.infer<typeof schema>

const ChangeVerifyEmail = ({ returnOtp }: Props) => {
   const dispatch = useAppDispatch()
   const { unverifiedUser } = useAppSelector(state => state.auth)
   const { changeRegisteredEmail } = useAuth()

   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         email: ''
      }
   })

   const onSubmit = async (data: FormData) => {
      await changeRegisteredEmail(unverifiedUser?.email!, data.email)
      dispatch(changeUnverifiedEmail(data.email))
      returnOtp()
   }

   const handleCancel = () => {
      returnOtp()
   }

   return (
      <div className="flex w-full flex-col items-center gap-7">
         <h1 className="whitespace-nowrap text-lg font-bold md:text-2xl">
            Change your email address
         </h1>
         <div className="flex w-full flex-col items-center">
            <span className="text-center text-sm">
               Made a typo? Add your preferred email address to receive your
               security code.
            </span>
         </div>

         <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={e => {
               if (e.key === 'Enter') {
                  e.preventDefault()
               }
            }}
            className="flex w-full flex-col gap-5"
         >
            <Controller
               name="email"
               control={form.control}
               render={({ field }) => (
                  <Input
                     {...form.register('email')}
                     placeholder="Email"
                     value={form.watch('email')}
                     isError={!!form.formState.errors.email}
                     errorMessage={form.formState.errors.email?.message ?? ''}
                     clearError={() => form.clearErrors('email')}
                     onChange={field.onChange}
                  />
               )}
            />

            <div className="grid w-full grid-cols-2 gap-[18px]">
               <button
                  onClick={handleCancel}
                  className="h-12 w-full rounded-full border-[1px] border-blue-500 bg-transparent text-sm text-blue-500 duration-75 ease-linear active:scale-95"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  className={twMerge(
                     'h-12 rounded-full active:scale-95 disabled:transform-none duration-75 ease-linear disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 text-sm font-semibold text-white'
                  )}
               >
                  Verify
               </button>
            </div>
         </form>
      </div>
   )
}

export default ChangeVerifyEmail
