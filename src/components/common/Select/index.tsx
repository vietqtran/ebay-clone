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
   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
   clearError?: () => void
   value?: string
   description?: string
   options?: { id: string; value: string; label: string }[]
}

const Input = React.forwardRef<HTMLSelectElement, InputProps>(
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
         value = '',
         description = '',
         options = []
      },
      ref
   ) => {
      const id = useId()
      const selectRef = React.useRef<HTMLSelectElement>(null)
      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         if (onChange) onChange(e)
         if (clearError && e.target.value) clearError()
      }
      return (
         <div className="flex w-full flex-col items-start gap-1">
            <div
               id={id}
               className={twMerge(
                  'relative flex h-10 w-full items-center bg-[#F7F7F7] overflow-hidden duration-75 ring-1 ring-[#8F8F8F] ease-linear rounded-md',
                  isError && 'ring-red-600'
               )}
            >
               <div
                  className={twMerge(
                     'absolute top-1/2 z-0 text-[#707070] -translate-y-1/2 duration-100 ease-linear px-4 text-sm',
                     value && 'top-3 text-[10px] z-20'
                  )}
               >
                  {placeholder}
               </div>
               <select
                  ref={selectRef}
                  onChange={handleChange}
                  className={twMerge(
                     'size-full text-sm cursor-pointer text-sm z-0 bg-transparent px-3 pt-[18px] pb-1 focus:outline-none mr-3'
                  )}
               >
                  <option value=""></option>
                  {options.map(option => (
                     <option
                        className="text-sm"
                        key={option.id}
                        value={option.value}
                     >
                        {option.label}
                     </option>
                  ))}
               </select>
            </div>
            {isError && errorMessage && (
               <span className="text-xs text-red-600">{errorMessage}</span>
            )}
            {description && (
               <span className="mt-1 text-xs text-[#707070]">
                  {description}
               </span>
            )}
         </div>
      )
   }
)

Input.displayName = 'Input'

export default memo(Input)
