import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
   const response = NextResponse.next()
   response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
   response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
   return response
}

export const config = {
   matcher: '/:path*'
}
