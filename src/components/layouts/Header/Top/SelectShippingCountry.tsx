import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import ChangeShipmentCountry from '@/components/modals/ChangeShipmentCountry'
import ReactCountryFlag from 'react-country-flag'
import { setCurrentShippingCountry } from '@/stores/country/countrySlice'
import { useCountry } from '@/hooks/useCountry'

type Props = {}

const SelectShippingCountry = (props: Props) => {
   const dispatch = useAppDispatch()
   const { getCountryByCode } = useCountry()
   const { currentShippingCountry } = useAppSelector(state => state.country)
   const [isOpenPortal, setIsOpenPortal] = React.useState(false)

   useEffect(() => {
      const fetchCountryData = async (countryCode: string) => {
         const response = await getCountryByCode(countryCode)
         dispatch(
            setCurrentShippingCountry({ currentShippingCountry: response })
         )
      }
      !currentShippingCountry && fetchCountryData('VN')
   }, [])

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
