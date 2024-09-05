import React, { memo, useId } from 'react'

import { twMerge } from 'tailwind-merge'

type InputProps = {
   label?: string
   isError?: boolean
   errorMessage?: string
   type?: 'text' | 'email' | 'password'
   iconButton?: React.ReactNode
   isAllNumber?: boolean
   placeholder?: string
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
   clearError?: () => void
   value?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   (
      {
         errorMessage = '',
         iconButton = null,
         isError = false,
         label = '',
         isAllNumber = false,
         type = 'text',
         placeholder = '',
         onChange,
         clearError,
         value = ''
      },
      ref
   ) => {
      const id = useId()
      const inputRef = React.useRef<HTMLInputElement>(null)
      const [isFocused, setIsFocused] = React.useState(false)
      const [isShowPassword, setIsShowPassword] = React.useState(false)
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (onChange) onChange(e)
         if (clearError && e.target.value) clearError()
      }
      return (
         <div className="flex w-full flex-col items-start gap-1">
            <div
               id={id}
               className={twMerge(
                  'relative flex h-10 w-full items-center bg-[#F7F7F7] overflow-hidden duration-75 ring-1 ring-[#8F8F8F] ease-linear rounded-md',
                  isFocused && '',
                  isError && 'ring-red-600'
               )}
            >
               <div
                  className={twMerge(
                     'absolute top-1/2 z-0 text-[#707070] -translate-y-1/2 duration-100 ease-linear px-4 text-sm',
                     (isFocused || value) && 'top-3 text-[10px] z-20'
                  )}
               >
                  {placeholder}
               </div>
               <input
                  ref={inputRef}
                  type={
                     type === 'password' && !isShowPassword
                        ? 'password'
                        : 'text'
                  }
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={twMerge(
                     'size-full text-sm z-0 bg-transparent px-4 pt-[18px] pb-1 focus:outline-none',
                     type === 'password' && 'pr-1'
                  )}
               />
               {type === 'password' && (
                  <button
                     type="button"
                     onClick={() => setIsShowPassword(!isShowPassword)}
                     className={twMerge(
                        'grid aspect-square h-full flex-shrink-0 cursor-pointer place-content-center pr-2'
                     )}
                  >
                     <div className="relative size-5">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                           <div
                              className={twMerge(
                                 `${isShowPassword ? 'w-[18px]' : 'w-0'} h-[1px] -rotate-45 bg-gray-800 duration-75 ease-linear`
                              )}
                           ></div>
                        </div>
                        <svg
                           className="size-full"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M2.9095 13.1718C2.56793 12.4286 2.56793 11.5714 2.9095 10.8282C4.4906 7.38843 7.96659 5 12.0004 5C16.0343 5 19.5102 7.38843 21.0913 10.8282C21.4329 11.5714 21.4329 12.4286 21.0913 13.1718C19.5102 16.6116 16.0343 19 12.0004 19C7.96659 19 4.4906 16.6116 2.9095 13.1718Z"
                              className={twMerge('stroke-gray-800')}
                              strokeWidth="1"
                           />
                           <path
                              d="M15.0004 12C15.0004 13.6569 13.6573 15 12.0004 15C10.3436 15 9.00042 13.6569 9.00042 12C9.00042 10.3431 10.3436 9 12.0004 9C13.6573 9 15.0004 10.3431 15.0004 12Z"
                              className={twMerge('stroke-gray-800')}
                              strokeWidth="1"
                           />
                        </svg>
                     </div>
                  </button>
               )}
            </div>
            <span className="text-xs text-red-600">{errorMessage}</span>
         </div>
      )
   }
)

Input.displayName = 'Input'

export default memo(Input)
