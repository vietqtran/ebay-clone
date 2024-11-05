'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pencil, Save, X } from 'lucide-react'
import { RootState } from '@/stores'
import { useAppSelector } from '@/hooks/useRedux'
import { Vendor } from '@/types/vendor'
import { useAddress } from '@/hooks/useAddress'
import { Address } from '@/types/address'
import { useCountry } from '@/hooks/useCountry'

export default function VendorProfile() {
   const { countries } = useCountry()
   const { getAddressesByUserId } = useAddress()
   const { vendor, user } = useAppSelector((state: RootState) => state.auth)

   const [isEditing, setIsEditing] = useState(false)
   const [editedProfile, setEditedProfile] = useState<Vendor | null>(vendor)
   const [address, setAddress] = useState<Address | null>(null)

   useEffect(() => {
      const fetchAddresses = async () => {
         const addresses = await getAddressesByUserId(user?.id!)
         setAddress(addresses as Address)
      }
      fetchAddresses()
   }, [vendor?.id])

   const handleEdit = () => {
      setIsEditing(true)
      setEditedProfile(vendor)
   }

   const handleCancel = () => {
      setIsEditing(false)
      setEditedProfile(vendor)
   }

   const handleSave = () => {
      setIsEditing(false)
   }

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {}

   return (
      <div className="container mx-auto py-10">
         <Card className="max-w-2xl mx-auto">
            <CardHeader>
               <CardTitle className="text-2xl font-bold">
                  Vendor Profile
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                     <AvatarImage
                        src={vendor?.logo_url}
                        alt={vendor?.business_name}
                     />
                     <AvatarFallback>
                        {vendor?.business_name.charAt(0)}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <h2 className="text-2xl font-bold">
                        {vendor?.business_name}
                     </h2>
                     <p className="text-muted-foreground">
                        Vendor ID: {vendor?.id}
                     </p>
                  </div>
               </div>
               {isEditing ? (
                  <div className="space-y-4">
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                           type="text"
                           id="name"
                           name="name"
                           value={editedProfile?.business_name}
                           onChange={handleChange}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="street_address">Street Address</Label>
                        <Input
                           type="text"
                           id="street_address"
                           name="street_address"
                           value={address?.street_address}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="street_address_2">
                           Street Address 2
                        </Label>
                        <Input
                           type="text"
                           id="street_address_2"
                           name="street_address_2"
                           value={address?.street_address_2 || ''}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="city">City</Label>
                        <Input
                           type="text"
                           id="city"
                           name="city"
                           value={address?.city}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="state">State</Label>
                        <Input
                           type="text"
                           id="state"
                           name="state"
                           value={address?.state}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="country_id">Country ID</Label>
                        <Input
                           type="text"
                           id="country_id"
                           name="country_id"
                           value={address?.country_id}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                           type="text"
                           id="postal_code"
                           name="postal_code"
                           value={address?.postal_code}
                        />
                     </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                           id="description"
                           name="description"
                           value={vendor?.description}
                           onChange={handleChange}
                           rows={4}
                        />
                     </div>
                  </div>
               ) : (
                  <div className="space-y-4">
                     <div>
                        <Label className="font-semibold">Email</Label>
                        <p>{user?.email}</p>
                     </div>
                     <div>
                        <Label className="font-semibold">Description</Label>
                        <p>{vendor?.description}</p>
                     </div>
                     <div>
                        <Label className="font-semibold">Status</Label>
                        <p className="capitalize">{vendor?.status}</p>
                     </div>
                     <div>
                        <Label className="font-semibold">Rating</Label>
                        <p>{vendor?.rating}</p>
                     </div>
                     <div>
                        <Label className="font-semibold">Address</Label>
                        <p>{address?.street_address}</p>
                        {address?.street_address_2 && (
                           <p>{address?.street_address_2}</p>
                        )}
                        <p>{`${address?.city}, ${address?.state} ${address?.postal_code}`}</p>
                        <p>
                           {
                              countries.find(
                                 country => country.id === address?.country_id
                              )?.name
                           }
                        </p>
                     </div>
                  </div>
               )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
               {isEditing ? (
                  <>
                     <Button variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                     </Button>
                     <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                     </Button>
                  </>
               ) : (
                  <Button onClick={handleEdit}>
                     <Pencil className="h-4 w-4 mr-2" />
                     Edit Profile
                  </Button>
               )}
            </CardFooter>
         </Card>
      </div>
   )
}
