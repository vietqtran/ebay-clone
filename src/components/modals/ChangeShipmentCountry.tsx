import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

import PortalWrapper from '../portal/PortalWrapper'
import ReactCountryFlag from 'react-country-flag'
import { ShippingCountry } from '@/types/country'
import SimpleBar from 'simplebar-react'
import { setCurrentShippingCountry } from '@/stores/country/countrySlice'
import useClickOutside from '@/hooks/useClickOutside'
import { useCountry } from '@/hooks/useCountry'

type Props = {
   handleClose: () => void
}

const ChangeShipmentCountry = ({ handleClose }: Props) => {
   const dispatch = useAppDispatch()
   const { getAllCountries } = useCountry()
   const { currentShippingCountry } = useAppSelector(state => state.country)
   const [countries, setCountries] = React.useState<ShippingCountry[]>([])
   const [isOpenDropdown, setIsOpenDropdown] = React.useState(false)
   const dropdownRef = useClickOutside(() => setIsOpenDropdown(false))

   useEffect(() => {
      const fetchCountriesData = async () => {
         const fetchedCountries = await getAllCountries()
         setCountries(fetchedCountries)
      }
      fetchCountriesData()
   }, [])

   const handleSelectCountry = (country: ShippingCountry) => {
      dispatch(setCurrentShippingCountry({ currentShippingCountry: country }))
   }

   return (
      <PortalWrapper handleClose={handleClose} childrenClassName="pb-[200px]">
         <div className="flex w-[468px] flex-col gap-3 rounded-lg bg-white px-8 py-6">
            <div className="flex items-center justify-between">
               <h2 className="font-semibold">Set your shipping location</h2>
               <button
                  onClick={handleClose}
                  className="text-sm font-semibold text-blue-500"
               >
                  Done
               </button>
            </div>
            <div className="w-full">
               <span className="text-sm">Ship to:</span>
            </div>
            <div
               ref={dropdownRef as React.RefObject<HTMLDivElement>}
               onClick={() => setIsOpenDropdown(!isOpenDropdown)}
               className="roudned-full relative flex h-12 cursor-pointer items-center justify-between rounded-full px-5 py-3 ring-1 ring-neutral-200 focus:outline-none"
            >
               <div className="flex items-center gap-2">
                  <ReactCountryFlag
                     style={{
                        fontSize: '1.5em'
                     }}
                     countryCode={currentShippingCountry?.code ?? ''}
                     svg
                  />
                  <span className="font-semibold">
                     {currentShippingCountry?.name}
                  </span>
               </div>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
               >
                  <path
                     fillRule="evenodd"
                     d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                     clipRule="evenodd"
                  />
               </svg>

               <div
                  style={{ display: isOpenDropdown ? 'block' : 'none' }}
                  className="absolute left-0 right-0 top-[calc(100%+10px)] w-full rounded-lg bg-white shadow-popup"
               >
                  <SimpleBar
                     style={{
                        maxHeight: '420px',
                        paddingTop: '10px',
                        paddingBottom: '10px'
                     }}
                  >
                     {countries.map((country: ShippingCountry) => (
                        <div
                           onClick={() => {
                              handleSelectCountry(country)
                           }}
                           key={country.code}
                           className="flex cursor-pointer items-center justify-between px-5 py-3 hover:bg-neutral-200 focus:outline-none"
                        >
                           <div className="flex items-center gap-2">
                              <ReactCountryFlag
                                 style={{
                                    fontSize: '1.5em'
                                 }}
                                 countryCode={country.code}
                                 svg
                              />
                              <span className="font-semibold">
                                 {country.name}
                              </span>
                           </div>
                        </div>
                     ))}
                  </SimpleBar>
               </div>
            </div>
         </div>
      </PortalWrapper>
   )
}

export default ChangeShipmentCountry
