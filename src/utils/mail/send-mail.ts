'use server'

import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import SenOTPTemplate from '@/components/email/SendOTPTemplate'

const transporter = nodemailer.createTransport({
   service: 'Gmail',
   secure: true,
   auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_APP_PASSWORD
   }
})

export const sendOtpEmail = async (to: string, otp: string) => {
   const emailHtml = await render(
      SenOTPTemplate({ code: otp }) as React.ReactElement
   )

   const options = {
      from: `eBay Siêu cấp VIP Pro <${process.env.NEXT_PUBLIC_EMAIL}>`,
      to,
      subject: 'hê lô uất !!!',
      html: emailHtml
   }
   await transporter.sendMail(options)
}
