import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "lib/session";

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const session = await getIronSession(request, res, sessionOptions)
    
    if (!session.user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return res
}

export const config = {
  matcher: '/user-space',
}