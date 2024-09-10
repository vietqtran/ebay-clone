import { Controller, useForm } from 'react-hook-form'

import Image from 'next/image'
import Input from '@/components/common/Input'
import Link from 'next/link'
import Loader from '@/components/common/Loader'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

export const schema = z.object({
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

const SignInForm = (props: Props) => {
   const {
      signInWithGoogle,
      signInWithFacebook,
      isLoading,
      loginWithCredentials
   } = useAuth()

   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         email: '',
         password: ''
      }
   })

   const onSubmit = async (data: FormData) => {
      await loginWithCredentials(data)
   }

   return (
      <div className="flex size-full flex-col items-center gap-3">
         <h1 className="text-4xl font-bold">Hello</h1>
         <h2 className="text-sm">
            Sign in to eBay or{' '}
            <Link className="text-blue-600 underline" href="/register">
               create an account
            </Link>
         </h2>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={e => {
               if (e.key === 'Enter') {
                  e.preventDefault()
               }
            }}
            className="mt-5 flex w-full flex-col gap-5"
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
         <div className="mb-4 mt-6 flex w-full items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
            <div className="text-xs">or continue with</div>
            <div className="h-[1px] flex-1 bg-[#c7c7c7]"></div>
         </div>
         <div className="grid h-16 w-full grid-cols-1 place-items-center gap-4">
            <button
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
      </div>
   )
}

export default SignInForm
