import ChangeShipmentCountry from '@/components/modals/ChangeShipmentCountry'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useAppSelector } from '@/hooks/useRedux'

type Props = {}

const SelectShippingCountry = (props: Props) => {
   const { currentShippingCountry } = useAppSelector(state => state.country)

   const [isOpenPortal, setIsOpenPortal] = React.useState(false)

   return (
      <>
         {isOpenPortal && (
            <ChangeShipmentCountry handleClose={() => setIsOpenPortal(false)} />
         )}
         <div
            onClick={() => setIsOpenPortal(true)}
            className="flex cursor-pointer items-center gap-1 text-xs"
         >
            <ReactCountryFlag
               style={{
                  fontSize: '2em'
               }}
               countryCode={currentShippingCountry?.code ?? ''}
               svg
            />
            <span>Ship to</span>
         </div>
      </>
   )
}

export default SelectShippingCountry
