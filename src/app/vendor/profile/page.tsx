'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { setVendor } from '@/stores/auth/authSlice'
import { Vendor } from '@/types/vendor'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const VendorProfile = () => {
   const supabase = createClient()
   const dispatch = useAppDispatch()
   const { vendor } = useAppSelector(state => state.auth)
   const [fakeVendor, setFakeVendor] = useState<Vendor | null>(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      if (!vendor) return
      setFakeVendor(vendor)
   }, [vendor])

   const updateVendor = async () => {
      setLoading(true)
      setError(null)

      if (!vendor || !fakeVendor) return

      const { data, error } = await supabase
         .from('vendors')
         .update({
            business_name: fakeVendor.business_name,
            description: fakeVendor.description,
            status: fakeVendor.status,
            rating: fakeVendor.rating,
            logo_url: fakeVendor.logo_url
         })
         .eq('id', vendor.id)
         .select('*')

      if (data) {
         dispatch(setVendor(data[0] as Vendor))
      }
      if (error) {
         setError('Error updating vendor')
      }

      setLoading(false)
   }

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const file = e.target.files[0]
      const { data, error } = await supabase.storage
         .from('images')
         .upload(`public/${file.name}${Math.random()}`, file, {
            cacheControl: '3600',
            upsert: false
         })
         if (error) {
            setError('Error uploading image')
         }
         if (data) {
            setFakeVendor({
               ...fakeVendor!,
               logo_url: data.fullPath
            })
      }
   }

   if (!vendor) return <div>Loading...</div>

   return (
      <div className="container mx-auto p-4">
         <h1 className="mb-4 text-2xl font-bold">Vendor Profile</h1>
         {error && <div className="text-red-500">{error}</div>}
         <div className="grid grid-cols-1 gap-4">
            <div>
               <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fakeVendor?.logo_url}`} alt="logo" width={100} height={100} className='aspect-square rounded-full ring-1 ring-neutral-100' />
               <label className="block text-gray-700">Business Name</label>
               <input
                  type="text"
                  name="business_name"
                  value={fakeVendor?.business_name || ''}
                  onChange={e =>
                     setFakeVendor({
                        ...fakeVendor!,
                        business_name: e.target.value
                     })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
               />
            </div>
            <div>
               <label className="block text-gray-700">Description</label>
               <textarea
                  name="description"
                  onChange={e =>
                     setFakeVendor({
                        ...fakeVendor!,
                        description: e.target.value
                     })
                  }
                  value={fakeVendor?.description || ''}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
               />
            </div>
            <div>
               <label className="block text-gray-700">Status</label>
               <span>{vendor.status === 'active' ? 'Active' : 'Inactive'}</span>
            </div>
            <div>
               <label className="block text-gray-700">Logo URL</label>
               <input
                  type="file"
                  onChange={handleFileChange}
                  name="logo_url"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
               />
               <span>{fakeVendor?.logo_url}</span>
            </div>
         </div>
         <button
            onClick={updateVendor}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
            disabled={loading}
         >
            {loading ? 'Updating...' : 'Update Profile'}
         </button>
      </div>
   )
}

export default VendorProfile
