import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Component() {
   return (
      <div className="space-y-4 p-8 pt-6">
         <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                     +20.1% from last month
                  </p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                     +201 from last month
                  </p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">246</div>
                  <p className="text-xs text-muted-foreground">
                     +8 new products
                  </p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Active Now
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                     +201 since last hour
                  </p>
               </CardContent>
            </Card>
         </div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
               <CardHeader>
                  <CardTitle>Overview</CardTitle>
               </CardHeader>
               <CardContent className="pl-2"></CardContent>
            </Card>
            <Card className="col-span-3">
               <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-8">
                     {[
                        {
                           name: 'Olivia Martin',
                           email: 'olivia.martin@email.com',
                           sale: '+$1,999.00'
                        },
                        {
                           name: 'Jackson Lee',
                           email: 'jackson.lee@email.com',
                           sale: '+$39.00'
                        },
                        {
                           name: 'Isabella Nguyen',
                           email: 'isabella.nguyen@email.com',
                           sale: '+$299.00'
                        },
                        {
                           name: 'William Kim',
                           email: 'will@email.com',
                           sale: '+$99.00'
                        },
                        {
                           name: 'Sofia Davis',
                           email: 'sofia.davis@email.com',
                           sale: '+$39.00'
                        }
                     ].map((sale, index) => (
                        <div key={index} className="flex items-center">
                           <Avatar className="h-9 w-9">
                              <AvatarImage
                                 src={`/placeholder.svg?height=36&width=36`}
                                 alt={sale.name}
                              />
                              <AvatarFallback>
                                 {sale.name
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')}
                              </AvatarFallback>
                           </Avatar>
                           <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                 {sale.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {sale.email}
                              </p>
                           </div>
                           <div className="ml-auto font-medium">
                              {sale.sale}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
