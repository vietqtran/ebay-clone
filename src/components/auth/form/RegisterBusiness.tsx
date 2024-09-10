import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/common/Checkbox'
import Input from '@/components/common/Input'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Select from '@/components/common/Select'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/components/common/Loader'
import { useCountry } from '@/hooks/useCountry'
import { ShippingCountry } from '@/types/country'
import { toast } from 'sonner'

type Props = {}

export const schema = z.object({
   business_name: z
      .string()
      .min(1, 'Please enter your business name')
      .max(50, 'Business name is too long'),
   email: z
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
   const { registerBusinessStep1, isLoading } = useAuth()
   const { getAllCountries } = useCountry()
   const [countries, setCountries] = React.useState<ShippingCountry[]>([])
   const [isAgreed, setIsAgreed] = React.useState(false)

   useEffect(() => {
      const fetchCountries = async () => {
         const countries = await getAllCountries()
         setCountries(countries)
      }
      fetchCountries()
   }, [])

   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         business_name: '',
         email: '',
         password: '',
         country: ''
      }
   })

   const onSubmit = async (data: FormData) => {
      if (!isAgreed) {
         toast.error('Please select checkbox to continue')
         return
      }
      const { business_name, email, password, country } = data
      await registerBusinessStep1(country, email, business_name, password)
   }

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
            name="business_name"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('business_name')}
                  placeholder="Business name"
                  value={form.watch('business_name')}
                  isError={!!form.formState.errors.business_name}
                  errorMessage={
                     form.formState.errors.business_name?.message ?? ''
                  }
                  clearError={() => form.clearErrors('business_name')}
                  onChange={field.onChange}
               />
            )}
         />
         <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('email')}
                  placeholder="Business email"
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
                  options={countries.map((country: ShippingCountry) => ({
                     label: country.name,
                     value: country.code,
                     id: country.code
                  }))}
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
            {!isLoading ? (
               <span className="text-sm font-semibold text-white">
                  Create business account
               </span>
            ) : (
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
   )
}

export default RegisterBusiness
