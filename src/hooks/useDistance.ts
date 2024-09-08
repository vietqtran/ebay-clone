import { getDistance } from 'geolib'
import { useCountry } from './useCountry'

export const useDistance = () => {
   const { fetchCountryData } = useCountry()
   const toRad = (value: number) => {
      return (value * Math.PI) / 180
   }

   const haversineDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
   ) => {
      const R = 6371 // Đường kính trái đất tính bằng km
      const dLat = toRad(lat2 - lat1)
      const dLon = toRad(lon2 - lon1)

      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      return R * c // khoảng cách tính bằng km
   }

   const calculateDistanceBetweenCountries = async (
      countryCode1: string,
      countryCode2: string
   ) => {
      const country1 = await fetchCountryData(countryCode1)
      const country2 = await fetchCountryData(countryCode2)

      const distance = haversineDistance(
         country1.lat,
         country1.lng,
         country2.lat,
         country2.lng
      )
      return distance // khoảng cách tính bằng km
   }

   return { calculateDistanceBetweenCountries }
}
