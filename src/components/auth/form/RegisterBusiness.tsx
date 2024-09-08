import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/common/Checkbox'
import Image from 'next/image'
import Input from '@/components/common/Input'
import Link from 'next/link'
import Loader from '@/components/common/Loader'
import React from 'react'
import Select from '@/components/common/Select'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

export const schema = z.object({
   businessName: z
      .string()
      .min(1, 'Please enter your business name')
      .max(50, 'Business name is too long'),
   lastName: z
      .string()
      .min(1, 'Please enter your last name')
      .max(50, 'First name is too long'),
   businessEmail: z
      .string()
      .min(1, 'Please enter your business email')
      .email('Invalid Business email address'),
   password: z
      .string()
      .min(1, 'Please enter your password')
      .min(8, 'Password is too short'),
   country: z.string()
})

type FormData = z.infer<typeof schema>

const RegisterBusiness = (props: Props) => {
   const [isAgreed, setIsAgreed] = React.useState(false)
   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         businessName: '',
         lastName: '',
         businessEmail: '',
         password: '',
         country: ''
      }
   })

   const onSubmit = (data: FormData) => {}

   return (
      <form
         onSubmit={form.handleSubmit(onSubmit)}
         onKeyDown={e => {
            if (e.key === 'Enter') {
               e.preventDefault()
            }
         }}
         className="flex flex-col gap-5"
      >
         <p className="text-sm">
            Continue to register as a{' '}
            <span className="font-bold">business or nonprofit</span>, or if you
            plan to sell a large number of goods.
         </p>
         <Controller
            name="businessName"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('businessName')}
                  placeholder="Business name"
                  value={form.watch('businessName')}
                  isError={!!form.formState.errors.businessName}
                  errorMessage={
                     form.formState.errors.businessName?.message ?? ''
                  }
                  clearError={() => form.clearErrors('businessName')}
                  onChange={field.onChange}
               />
            )}
         />
         <Controller
            name="businessEmail"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('businessEmail')}
                  placeholder="Business email"
                  value={form.watch('businessEmail')}
                  isError={!!form.formState.errors.businessEmail}
                  errorMessage={
                     form.formState.errors.businessEmail?.message ?? ''
                  }
                  clearError={() => form.clearErrors('businessEmail')}
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
                  errorMessage={form.formState.errors.password?.message ?? ''}
                  clearError={() => form.clearErrors('password')}
                  onChange={field.onChange}
               />
            )}
         />
         <Controller
            name="country"
            control={form.control}
            render={({ field }) => (
               <Select
                  placeholder="Where is your business registered?"
                  value={form.watch('country')}
                  options={[
                     {
                        id: '1',
                        value: '1',
                        label: 'Country 1'
                     },
                     {
                        id: '2',
                        value: '2',
                        label: 'Country 2'
                     },
                     {
                        id: '3',
                        value: '3',
                        label: 'Country 3'
                     },
                     {
                        id: '4',
                        value: '4',
                        label: 'Country 4'
                     },
                     {
                        id: '5',
                        value: '5',
                        label: 'Country 5'
                     }
                  ]}
                  description={`If your business isn't registered, select your country of residence.`}
                  onChange={field.onChange}
               />
            )}
         />

         <Checkbox
            onChange={() => setIsAgreed(!isAgreed)}
            label="I’m only interested in buying on eBay for now"
            value={isAgreed}
         />

         <div className="text-xs text-[#707070]">
            <p>
               By selecting{' '}
               <span className="font-bold">Create business account</span>, you
               agree to our{' '}
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
               Create business account
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
   )
}

export default RegisterBusiness
