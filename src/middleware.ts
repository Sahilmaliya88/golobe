
import { NextRequest, NextResponse} from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.nextSecret
export async function middleware(req:NextRequest){
        const url:string = process.env.NEXT_PUBLIC_APIURL as string
        //check if request is for verify
        const r_path:string  = req.nextUrl.pathname
        //this function like rail switer it will switch req destination based on token credentials
        if(r_path.startsWith('/api/user/verify')){
            const token = await getToken({req,secret})
            if(token){
                return NextResponse.rewrite(new URL(`${url}/api/user/verify/${token.email}`))
            }else{
               return NextResponse.next()
            }

        }
}