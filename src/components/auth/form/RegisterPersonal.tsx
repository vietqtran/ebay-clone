import { Controller, useForm } from 'react-hook-form'

import Image from 'next/image'
import Input from '@/components/common/Input'
import Link from 'next/link'
import Loader from '@/components/common/Loader'
import React from 'react'
import { RegisterPersonalCredentials } from '@/types/user'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

export const schema = z.object({
   first_name: z
      .string()
      .min(1, 'Please enter your first name')
      .max(50, 'First name is too long'),
   last_name: z
      .string()
      .min(1, 'Please enter your last name')
      .max(50, 'First name is too long'),
   email: z
      .string()
      .min(1, 'Please enter your email')
      .email('Invalid email address'),
   password: z
      .string()
      .min(1, 'Please enter your password')
      .min(8, 'Password is too short')
})

type FormData = z.infer<typeof schema>

const RegisterPersonal = (props: Props) => {
   const {
      signInWithGoogle,
      signInWithFacebook,
      isLoading,
      registerPersonalWithCredentials
   } = useAuth()
   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         first_name: '',
         last_name: '',
         email: '',
         password: ''
      }
   })

   const onSubmit = async (data: FormData) => {
      const registerCredentials: RegisterPersonalCredentials = {
         email: data.email,
         first_name: data.first_name,
         last_name: data.last_name,
         password: data.password,
         provider: 'email'
      }
      await registerPersonalWithCredentials(registerCredentials)
   }

   return (
      <>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
         >
            <div className="flex items-start gap-5">
               <Controller
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                     <Input
                        {...form.register('first_name')}
                        placeholder="First name"
                        value={form.watch('first_name')}
                        isError={!!form.formState.errors.first_name}
                        errorMessage={
                           form.formState.errors.first_name?.message ?? ''
                        }
                        clearError={() => form.clearErrors('first_name')}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                     <Input
                        {...form.register('last_name')}
                        placeholder="Last name"
                        value={form.watch('last_name')}
                        isError={!!form.formState.errors.last_name}
                        errorMessage={
                           form.formState.errors.last_name?.message ?? ''
                        }
                        clearError={() => form.clearErrors('last_name')}
                        onChange={field.onChange}
                     />
                  )}
               />
            </div>
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
            <Controller
               name="password"
               control={form.control}
               render={({ field }) => (
                  <Input
                     type="password"
                     {...form.register('password')}
                     placeholder="Password"
                     value={form.watch('password')}
                     isError={!!form.formState.errors.password}
                     errorMessage={
                        form.formState.errors.password?.message ?? ''
                     }
                     clearError={() => form.clearErrors('password')}
                     onChange={field.onChange}
                  />
               )}
            />
            <div className="text-xs text-[#707070]">
               <p>
                  By selecting{' '}
                  <span className="font-bold">Create personal account</span>,
                  you agree to our{' '}
                  <Link href={'#'} className="underline">
                     User <br /> Agreement
                  </Link>{' '}
                  and acknowledge reading our{' '}
                  <Link href={'#'} className="underline">
                     User Privacy Notice.
                  </Link>
               </p>
            </div>
            <button
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     e.preventDefault()
                  }
               }}
               type="submit"
               className={twMerge(
                  'flex h-12 items-center justify-center rounded-full cursor-not-allowed bg-[#c7c7c7]',
                  'bg-blue-600 active:scale-95 hover:bg-blue-800 duration-75 ease-linear cursor-pointer'
               )}
            >
               {!isLoading && (
                  <span className="text-sm font-semibold text-white">
                     Create personal account
                  </span>
               )}
               {isLoading && (
                  <Loader
                     style={{
                        width: '20px',
                        height: '20px',
                        color: 'white',
                        borderWidth: '2px'
                     }}
                  />
               )}
            </button>
         </form>
         <div className="mb-4 mt-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
            <div className="text-xs">or continue with</div>
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
         </div>
         <div className="grid h-16 grid-cols-3 place-items-center gap-4">
            <button
               type="button"
               onClick={signInWithFacebook}
               className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-[1px] border-[#c7c7c7] duration-75 ease-linear hover:bg-black/5"
            >
               <Image
                  src={'/icons/facebook-color.svg'}
                  width={16}
                  height={16}
                  alt=""
                  priority
               />
               <span className="text-sm font-semibold">Facebook</span>
            </button>
            <button
               type="button"
               onClick={signInWithGoogle}
               className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-[1px] border-[#c7c7c7] duration-75 ease-linear hover:bg-black/5"
            >
               <Image
                  src={'/icons/google-color.svg'}
                  width={16}
                  height={16}
                  alt=""
                  priority
               />
               <span className="text-sm font-semibold">Google</span>
            </button>
            <div className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-[1px] border-[#c7c7c7] duration-75 ease-linear hover:bg-black/5">
               <Image
                  src={'/icons/apple-color.svg'}
                  width={16}
                  height={16}
                  alt=""
                  priority
               />
               <span className="text-sm font-semibold">Apple</span>
            </div>
         </div>
      </>
   )
}

export default RegisterPersonal
