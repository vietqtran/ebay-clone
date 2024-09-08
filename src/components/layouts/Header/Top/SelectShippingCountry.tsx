import { CountryData, parseCountryData } from '@/types/country'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import ChangeShipmentCountry from '@/components/modals/ChangeShipmentCountry'
import ReactCountryFlag from 'react-country-flag'
import { setCurrentShippingCountry } from '@/stores/country/countrySlice'

type Props = {}

const SelectShippingCountry = (props: Props) => {
   const dispatch = useAppDispatch()
   const { currentShippingCountry } = useAppSelector(state => state.country)
   const [isOpenPortal, setIsOpenPortal] = React.useState(false)

   useEffect(() => {
      const fetchCountryData = async (countryCode: string) => {
         const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
         )
         const data = (await response.json()) as CountryData[]
         dispatch(
            setCurrentShippingCountry({
               currentShippingCountry: parseCountryData(data[0])
            })
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
