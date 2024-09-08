export interface CountryData {
   name: {
      common: string
      official: string
      nativeName: {
         [key: string]: {
            official: string
            common: string
         }
      }
   }
   cca2: string
   currencies: {
      [key: string]: {
         name: string
         symbol: string
      }
   }
}

export const parseCountryData = (data: CountryData): ShippingCountry => {
   const currencyKey = Object.keys(data.currencies)[0]
   return {
      name: data.name.common,
      code: data.cca2,
      currency: data.currencies[currencyKey]?.name ?? 'USD',
      currencySymbol: data.currencies[currencyKey]?.symbol ?? '$'
   }
}

export type ShippingCountry = {
   name: string
   code: string
   currency: string
   currencySymbol: string
}
