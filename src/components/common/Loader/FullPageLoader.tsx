'use client'

import React from 'react'
import Loader from '.'
import { useAppSelector } from '@/hooks/useRedux'

interface Props {}

const FullPageLoader = (props: Props) => {
   const { isLoadingFullScreen } = useAppSelector(state => state.common)
   return !isLoadingFullScreen ? null : (
      <div className="fixed inset-0 z-[99999] grid size-full place-items-center bg-white/70">
         <Loader
            style={{
               width: '50px',
               height: '50px',
               border: '3px solid #60a5fa'
            }}
         />
      </div>
   )
}

export default FullPageLoader
