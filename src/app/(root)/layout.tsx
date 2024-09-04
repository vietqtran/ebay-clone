import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return <DefaultLayout>{children}</DefaultLayout>
}

export default RootLayout
