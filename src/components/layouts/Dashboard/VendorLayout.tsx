'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
   Package,
   ShoppingCart,
   Users,
   UserCircle,
   Menu,
   LogOutIcon
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { setUser, setVendor } from '@/stores/auth/authSlice'
import { useRouter } from 'next/navigation'

interface SidebarProps {
   vendorName: string
   vendorAvatar: string
}

function Sidebar({ vendorName, vendorAvatar }: Readonly<SidebarProps>) {
   const dispatch = useAppDispatch()
   const { push } = useRouter()
   return (
      <div className="flex h-screen flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
               <Package className="h-6 w-6" />
               <span className="">Vendor Dashboard</span>
            </Link>
         </div>
         <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
               <Link href="/vendor/orders">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <ShoppingCart className="h-4 w-4" />
                     Orders
                  </Button>
               </Link>
               <Link href="/vendor/products">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <Package className="h-4 w-4" />
                     Products
                  </Button>
               </Link>
               <Link href="/vendor/customers">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <Users className="h-4 w-4" />
                     Customers
                  </Button>
               </Link>
               <Link href="/vendor/profile">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <UserCircle className="h-4 w-4" />
                     Profile
                  </Button>
               </Link>
               <div
                  onClick={() => {
                     dispatch(setUser(null))
                     dispatch(setVendor(null))
                     push('/signin')
                  }}
               >
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <LogOutIcon className="h-4 w-4" />
                     Logout
                  </Button>
               </div>
            </nav>
         </ScrollArea>
         <div className="mt-auto p-4">
            <div className="flex items-center gap-4">
               <Avatar>
                  <AvatarImage alt="Vendor avatar" src={vendorAvatar} />
                  <AvatarFallback>{vendorName.charAt(0)}</AvatarFallback>
               </Avatar>
               <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                     {vendorName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                     Vendor
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default function VendorLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   const [sidebarOpen, setSidebarOpen] = React.useState(false)

   return (
      <div className="flex min-h-screen flex-col">
         <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
            <Button
               variant="ghost"
               size="icon"
               className="lg:hidden"
               onClick={() => setSidebarOpen(!sidebarOpen)}
            >
               <Menu className="h-6 w-6" />
               <span className="sr-only">Toggle sidebar</span>
            </Button>
            <div className="flex-1">
               <h1 className="font-semibold">Dashboard</h1>
            </div>
         </header>
         <div className="flex-1 items-start lg:grid lg:grid-cols-[240px_1fr]">
            <aside
               className={`fixed inset-y-0 left-0 z-50 w-full transform overflow-y-auto border-r bg-background transition-transform lg:relative lg:translate-x-0 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
               }`}
            >
               <Sidebar
                  vendorName="John Doe"
                  vendorAvatar="/placeholder.svg?height=32&width=32"
               />
            </aside>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
         </div>
      </div>
   )
}
