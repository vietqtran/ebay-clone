'use server'

import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import ConfirmTemplate from '@/components/email/ConfirmTemplate'

const transporter = nodemailer.createTransport({
   service: 'Gmail',
   secure: true,
   auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_APP_PASSWORD
   }
})

export async function sendEmail(to: string[]): Promise<void> {
   const emailHtml = await render(ConfirmTemplate({}) as React.ReactElement)

   const options = {
      from: `eBay Siêu cấp VIP Pro <${process.env.NEXT_PUBLIC_EMAIL}>`,
      to,
      subject: 'hê lô uất !!!',
      html: emailHtml
   }

   await transporter.sendMail(options)
}
