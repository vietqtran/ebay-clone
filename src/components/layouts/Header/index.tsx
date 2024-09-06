import Link from 'next/link'
import React from 'react'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

type Props = {}

const Header = (props: Props) => {
   return (
      <header className="z-10 w-full border-b-[1px] border-b-neutral-200 pb-3">
         <div className="flex size-full flex-col">
            <HeaderTop />
            <HeaderBottom />
         </div>
      </header>
   )
}

export default Header
