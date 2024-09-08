import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ShippingCountry } from '@/types/country'

interface CountryState {
   currentShippingCountry: ShippingCountry | null
}

const initialState: CountryState = {
   currentShippingCountry: null
}

const countrySlice = createSlice({
   name: 'country',
   initialState,
   reducers: {
      setCurrentShippingCountry(
         state,
         action: PayloadAction<{
            currentShippingCountry: any
         }>
      ) {
         return { ...state, ...action.payload }
      }
   }
})

export const { setCurrentShippingCountry } = countrySlice.actions
export { countrySlice }
