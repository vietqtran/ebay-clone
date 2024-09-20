import React from 'react'

const Topbar: React.FC = () => {
   return (
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
         <div className="text-xl font-bold">Dashboard</div>
         <div className="flex space-x-4">
            <div className="cursor-pointer">Notifications</div>
            <div className="cursor-pointer">Settings</div>
         </div>
      </div>
   )
}

export default Topbar
