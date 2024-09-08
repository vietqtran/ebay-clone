export const useCountry = () => {
   const fetchCountryData = async (countryCode: string) => {
      const response = await fetch(
         `https://restcountries.com/v3.1/alpha/${countryCode}`
      )
      const data = await response.json()
      return {
         lat: data[0].latlng[0],
         lng: data[0].latlng[1]
      }
   }

   return { fetchCountryData }
}
