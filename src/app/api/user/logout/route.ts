import {  NextResponse } from "next/server";

export function GET(){
    try{
        const response = NextResponse.json({message:'logged out'},{status:200})
        response.cookies.set("jwt","",{
            expires:new Date(Date.now()-10*1000)
        })
        return response
    }catch(err){

    }
}