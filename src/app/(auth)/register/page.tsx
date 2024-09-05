'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import RegisterBusiness from '@/components/auth/form/RegisterBusiness'
import RegisterPersonal from '@/components/auth/form/RegisterPersonal'
import { setCurrentRegisterForm } from '@/stores/auth/authSlice'
import { twMerge } from 'tailwind-merge'

export default function Register() {
   const dispatch = useAppDispatch()
   const { currentRegisterForm } = useAppSelector(state => state.auth)

   return (
      <div className="size-full">
         <h1 className="mb-5 text-4xl font-bold">Create an account</h1>
         <div className="relative mb-4 grid h-10 w-full grid-cols-2 rounded-full border-[1px] border-black text-sm">
            <div className="absolute inset-0 z-[-1] size-full p-0.5">
               <div className="relative size-full rounded-full">
                  <div
                     className={`h-full w-1/2 rounded-full absolute bg-black duration-100 ease-linear ${currentRegisterForm === 'personal' ? 'left-0' : 'left-1/2'}`}
                  ></div>
               </div>
            </div>
            <button
               onClick={() =>
                  dispatch(
                     setCurrentRegisterForm({ currentRegisterForm: 'personal' })
                  )
               }
               className={twMerge(
                  'text-black duration-100 ease-linear',
                  currentRegisterForm === 'personal' && 'text-white'
               )}
            >
               Personal
            </button>
            <button
               onClick={() =>
                  dispatch(
                     setCurrentRegisterForm({ currentRegisterForm: 'business' })
                  )
               }
               className={twMerge(
                  'text-black duration-100 ease-linear',
                  currentRegisterForm === 'business' && 'text-white'
               )}
            >
               Business
            </button>
         </div>

         {currentRegisterForm === 'personal' ? (
            <RegisterPersonal />
         ) : (
            <RegisterBusiness />
         )}
      </div>
   )
}
