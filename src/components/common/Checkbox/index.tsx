import React, { useId } from 'react'

type Props = {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
   label: string
   value: boolean
   isError?: boolean
   errorMessage?: string
}

const Checkbox = ({ label, errorMessage, isError, onChange, value }: Props) => {
   const id = useId()
   return (
      <div className="flex flex-col items-start justify-center">
         <div className="flex items-center">
            <input
               id={id}
               type="checkbox"
               className="mr-3 h-[18px] w-[18px] rounded accent-black"
               checked={value}
               onChange={onChange}
            />
            <label className="cursor-pointer text-sm" htmlFor={id}>
               {label}
            </label>
         </div>
         {isError && errorMessage && (
            <span className="text-xs text-red-600">{errorMessage}</span>
         )}
      </div>
   )
}

export default Checkbox
