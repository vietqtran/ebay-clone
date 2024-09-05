import { Controller, useForm } from 'react-hook-form'

import Image from 'next/image'
import Input from '@/components/common/Input'
import Link from 'next/link'
import Loader from '@/components/common/Loader'
import React from 'react'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

export const schema = z.object({
   firstName: z
      .string()
      .min(1, 'Please enter your first name')
      .max(50, 'First name is too long'),
   lastName: z
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
   const { signInWithGoogle } = useAuth()
   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: ''
      }
   })

   const onSubmit = (data: FormData) => {
      console.log(form.formState.errors)
      console.log(data)
   }

   return (
      <>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={e => {
               if (e.key === 'Enter') {
                  e.preventDefault()
               }
            }}
            className="flex flex-col gap-5"
         >
            <div className="flex items-start gap-5">
               <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                     <Input
                        {...form.register('firstName')}
                        placeholder="First name"
                        value={form.watch('firstName')}
                        isError={!!form.formState.errors.firstName}
                        errorMessage={
                           form.formState.errors.firstName?.message ?? ''
                        }
                        clearError={() => form.clearErrors('firstName')}
                        onChange={field.onChange}
                     />
                  )}
               />
               <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                     <Input
                        {...form.register('lastName')}
                        placeholder="Last name"
                        value={form.watch('lastName')}
                        isError={!!form.formState.errors.lastName}
                        errorMessage={
                           form.formState.errors.lastName?.message ?? ''
                        }
                        clearError={() => form.clearErrors('lastName')}
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
               type="submit"
               className={twMerge(
                  'flex h-12 items-center justify-center rounded-full cursor-not-allowed bg-[#c7c7c7]',
                  'bg-blue-600 active:scale-95 hover:bg-blue-800 duration-75 ease-linear cursor-pointer'
               )}
            >
               <span className="text-sm font-semibold text-white">
                  Create personal account
               </span>
               {/* <Loader
                  style={{
                     width: '20px',
                     height: '20px',
                     color: 'white',
                     borderWidth: '2px'
                  }}
               /> */}
            </button>
         </form>
         <div className="mb-4 mt-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
            <div className="text-xs">or continue with</div>
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
         </div>
         <div className="grid h-16 grid-cols-3 place-items-center gap-4">
            <div className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-[1px] border-[#c7c7c7] duration-75 ease-linear hover:bg-black/5">
               <Image
                  src={'/icons/facebook-color.svg'}
                  width={16}
                  height={16}
                  alt=""
                  priority
               />
               <span className="text-sm font-semibold">Facebook</span>
            </div>
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
