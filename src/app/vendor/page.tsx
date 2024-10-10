export default function Vendor() {
   return (
      <div className="flex-1 bg-gray-100 p-6">
         <h1 className="mb-4 text-3xl font-bold">Overview</h1>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded bg-white p-4 shadow">
               <h2 className="mb-2 text-xl font-bold">Total Sales</h2>
               <p className="text-3xl">$12,340</p>
            </div>
            <div className="rounded bg-white p-4 shadow">
               <h2 className="mb-2 text-xl font-bold">Orders</h2>
               <p className="text-3xl">123</p>
            </div>
            <div className="rounded bg-white p-4 shadow">
               <h2 className="mb-2 text-xl font-bold">Products</h2>
               <p className="text-3xl">45</p>
            </div>
         </div>
      </div>
   )
}
