import AuthLayout from '@/components/layouts/AuthLayout'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
   return <AuthLayout>{children}</AuthLayout>
}

export default Layout
