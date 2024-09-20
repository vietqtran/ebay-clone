import Sidebar from '@/components/layouts/DashBoard/VendorSidebar'
import Topbar from '@/components/layouts/DashBoard/VendorTopBar'
import React from 'react'

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex h-screen">
         <Sidebar />
         <div className="flex flex-1 flex-col">
            <Topbar />
            {children}
         </div>
      </div>
   )
}

export default VendorLayout
