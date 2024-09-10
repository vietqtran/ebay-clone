import { NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function POST(req: Request) {
   const { hashed_password, password } = await req.json()

   try {
      const isMatch = await argon2.verify(hashed_password, password)
      if (isMatch) {
         return NextResponse.json({ message: 'Password verified', isMatch })
      } else {
         return NextResponse.json(
            { error: 'Invalid password' },
            { status: 401 }
         )
      }
   } catch (error) {
      return NextResponse.json(
         { error: 'Error verifying password' },
         { status: 500 }
      )
   }
}
