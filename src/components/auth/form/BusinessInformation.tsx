'use client'

import Input from '@/components/common/Input'
import Loader from '@/components/common/Loader'
import Select from '@/components/common/Select'
import { useAuth } from '@/hooks/useAuth'
import { useCountry } from '@/hooks/useCountry'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { Address } from '@/types/address'
import { ShippingCountry } from '@/types/country'
import { User } from '@/types/user'
import { Vendor } from '@/types/vendor'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

type Props = {}

export const schema = z.object({
   country: z.string(),
   street_address: z
      .string()
      .min(1, 'Please enter a valid address.')
      .max(100, 'Street address is too long.'),
   street_address_2: z
      .string()
      .max(100, 'Street address 2 is too long.')
      .optional(),
   city: z
      .string()
      .min(1, 'Please enter a valid city.')
      .max(100, 'City is too long.'),
   state: z
      .string()
      .min(1, 'Please enter a valid state.')
      .max(100, 'State is too long.'),
   postal_code: z
      .string()
      .min(1, 'Please enter a valid postal code.')
      .max(10, 'Invalid postal code.'),
   first_name: z
      .string()
      .min(1, 'Please enter a valid first name.')
      .max(50, 'First name is too long.'),
   last_name: z
      .string()
      .min(1, 'Please enter a valid last name.')
      .max(50, 'Last name is too long.'),
   phone_number: z
      .string()
      .min(4, 'Please enter a valid phone number.')
      .max(15, 'Please enter a valid phone number.')
})

type FormData = z.infer<typeof schema>

const BusinessInformation = (props: Props) => {
   const { push } = useRouter()
   const dispatch = useAppDispatch()
   const { businessRegisterForm } = useAppSelector(state => state.auth)
   const { getAllCountries, getCountryByCode } = useCountry()
   const { registerBusinessStep2 } = useAuth()

   const [isLoading, setIsLoading] = React.useState(false)
   const [countries, setCountries] = React.useState<ShippingCountry[]>([])

   useEffect(() => {
      const fetchCountries = async () => {
         const countries = await getAllCountries()
         setCountries(countries)
      }
      fetchCountries()
   }, [])

   useEffect(() => {
      if (!businessRegisterForm) {
         push('/register')
      }
   }, [businessRegisterForm])

   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         country: businessRegisterForm?.country,
         street_address: '',
         street_address_2: '',
         city: '',
         state: '',
         postal_code: '',
         first_name: '',
         last_name: '',
         phone_number: ''
      }
   })

   const onSubmit = async (data: FormData) => {
      setIsLoading(true)
      try {
         const country = await getCountryByCode(data.country)
         const address: Address = {
            country_id: country?.id!,
            street_address: data.street_address,
            street_address_2: data.street_address_2 ?? '',
            city: data.city,
            state: data.state,
            postal_code: data.postal_code
         }
         const user: User = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: businessRegisterForm?.email!,
            provider: 'email',
            hashed_password: businessRegisterForm?.password!,
            is_verified: true
         }
         const vendor: Vendor = {
            business_name: businessRegisterForm?.business_name!
         }
         await registerBusinessStep2(user, address, vendor)
      } catch (error) {
      } finally {
         setIsLoading(false)
      }
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
         <h1 className="text-3xl font-bold">Tell us about your business</h1>
         <p className="text-sm">
            Please enter your{' '}
            <span className="font-bold">legally registered</span> business
            address and phone number. This is for verification purposes only.
         </p>
         <Controller
            name="country"
            control={form.control}
            render={({ field }) => (
               <Select
                  disabled
                  placeholder="Where is your business registered?"
                  value={form.watch('country')}
                  options={countries.map((country: ShippingCountry) => ({
                     label: country.name,
                     value: country.code,
                     id: country.code
                  }))}
               />
            )}
         />
         <Controller
            name="street_address"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('street_address')}
                  placeholder="Street Address"
                  value={form.watch('street_address')}
                  isError={!!form.formState.errors.street_address}
                  errorMessage={
                     form.formState.errors.street_address?.message ?? ''
                  }
                  clearError={() => form.clearErrors('street_address')}
                  onChange={field.onChange}
               />
            )}
         />
         <Controller
            name="street_address_2"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('street_address_2')}
                  placeholder="Street Address 2 (Optional)"
                  value={form.watch('street_address_2')}
                  isError={!!form.formState.errors.street_address_2}
                  errorMessage={
                     form.formState.errors.street_address_2?.message ?? ''
                  }
                  clearError={() => form.clearErrors('street_address_2')}
                  onChange={field.onChange}
               />
            )}
         />
         <Controller
            name="city"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('city')}
                  placeholder="City"
                  value={form.watch('city')}
                  isError={!!form.formState.errors.city}
                  errorMessage={form.formState.errors.city?.message ?? ''}
                  clearError={() => form.clearErrors('city')}
                  onChange={field.onChange}
               />
            )}
         />
         <div className="grid w-full grid-cols-2 gap-5">
            <Controller
               name="state"
               control={form.control}
               render={({ field }) => (
                  <Input
                     {...form.register('state')}
                     placeholder="State or Province or Region"
                     value={form.watch('state')}
                     isError={!!form.formState.errors.state}
                     errorMessage={form.formState.errors.state?.message ?? ''}
                     clearError={() => form.clearErrors('state')}
                     onChange={field.onChange}
                  />
               )}
            />
            <Controller
               name="postal_code"
               control={form.control}
               render={({ field }) => (
                  <Input
                     {...form.register('postal_code')}
                     placeholder="Zip Code"
                     value={form.watch('postal_code')}
                     isError={!!form.formState.errors.postal_code}
                     errorMessage={
                        form.formState.errors.postal_code?.message ?? ''
                     }
                     clearError={() => form.clearErrors('postal_code')}
                     onChange={field.onChange}
                  />
               )}
            />
         </div>
         <div className="text-sm">
            <p className="my-3 font-bold">Tell us how to contact you</p>
            <p>
               {`We'll use this info to notify you about account activity, or
               anything else that requires your attention.`}
            </p>
         </div>
         <div className="grid w-full grid-cols-2 gap-5">
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
            name="phone_number"
            control={form.control}
            render={({ field }) => (
               <Input
                  {...form.register('phone_number')}
                  isAllNumber
                  placeholder="Phone number"
                  value={form.watch('phone_number')}
                  isError={!!form.formState.errors.phone_number}
                  errorMessage={
                     form.formState.errors.phone_number?.message ?? ''
                  }
                  clearError={() => form.clearErrors('phone_number')}
                  onChange={field.onChange}
               />
            )}
         />

         <button
            type="submit"
            className={twMerge(
               'flex h-12 items-center justify-center rounded-full cursor-not-allowed bg-[#c7c7c7]',
               'bg-blue-600 active:scale-95 hover:bg-blue-800 duration-75 ease-linear cursor-pointer'
            )}
         >
            {!isLoading ? (
               <span className="text-sm font-semibold text-white">
                  Continue
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

export default BusinessInformation
