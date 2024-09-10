import { NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function POST(req: Request) {
   const { password } = await req.json()

   try {
      const hash = await argon2.hash(password)
      return NextResponse.json({ hash })
   } catch (error) {
      return NextResponse.json(
         { error: 'Error hashing password' },
         { status: 500 }
      )
   }
}
