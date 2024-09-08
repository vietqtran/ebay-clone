import HeaderBottom from './Bottom'
import HeaderTop from './Top'
import React from 'react'

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
