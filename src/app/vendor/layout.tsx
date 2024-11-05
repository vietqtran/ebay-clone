import VendorLayout from '@/components/layouts/DashBoard/VendorLayout'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
   return <VendorLayout>{children}</VendorLayout>
}

export default Layout
