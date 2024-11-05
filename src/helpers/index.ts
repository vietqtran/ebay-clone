export const generateOTP = () => {
   const digits = '0123456789'
   let OTP = ''
   for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)]
   }
   return OTP
}

export const parseImageUrl = (url: string) => {
   return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`
}
