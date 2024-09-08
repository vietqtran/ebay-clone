import React from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'

type Props = {
   children: React.ReactNode
   childrenClassName?: string
   handleClose?: () => void
}

const PortalWrapper = ({ children, childrenClassName, handleClose }: Props) => {
   const portalElement = document.getElementById('portal')

   if (!portalElement) {
      throw new Error('Portal element not found')
   }

   return ReactDOM.createPortal(
      <>
         <div
            onClick={handleClose}
            className="fixed inset-0 z-[9999] bg-black/60"
         />
         <div
            className={twMerge(
               'fixed left-1/2 top-1/2 z-[10000] -translate-x-1/2 -translate-y-1/2 p-5',
               childrenClassName
            )}
         >
            {children}
         </div>
      </>,
      portalElement
   )
}

export default PortalWrapper
