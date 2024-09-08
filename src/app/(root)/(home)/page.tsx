'use client'

import HomePage from '@/components/home'
import { useDistance } from '@/hooks/useDistance'
import { useEffect } from 'react'

export default function Home() {
   const { calculateDistanceBetweenCountries } = useDistance()
   useEffect(() => {
      const calculateDistance = async () => {
         const distance = await calculateDistanceBetweenCountries('VN', 'LA')
         console.log(`Distance: ${distance} km`)
      }
      calculateDistance()
   }, [])
   return <HomePage />
}
