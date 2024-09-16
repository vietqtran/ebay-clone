import React from 'react'
import '@shopify/polaris/build/esm/styles.css'

type Props = {
   children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
   return <div>{children}</div>
}

export default DashboardLayout
