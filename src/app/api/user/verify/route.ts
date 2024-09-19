import { NextRequest, NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';
import { redis } from "@/DB/Redis";
import { connectToDatabase } from "@/DB/connectDb";
import UserModel from "@/DB/models/userModel";
import { user } from "@/types/auth";
interface jwtpayload{
    id: string,
    iat:number,
    exp:number
}
export async function GET(req:NextRequest):Promise<NextResponse>{
    try{
         //cookie validation
         const token:string = req.cookies.get("jwt")?.value || ''
         const decoded:jwtpayload= jwt.verify(token,process.env.jwtsecret || 'nothin') as jwtpayload
         if(!decoded.id){
            throw new Error("please login")
         }
         if(decoded.exp*1000<Date.now()){
            throw new Error('token expired,Please login!')
         }
         let user:user | null = await redis.get(`user:-${decoded.id}`)
         if(user){
            return NextResponse.json({status:"success",user:user})
         }else{
            await connectToDatabase()
            user = await UserModel.findById(decoded.id)
            await redis.set(`user:-${user?.id}`,JSON.stringify(user))
         }
         return NextResponse.json({status:"success",user:user},{status:200})
    }catch(err){
        return NextResponse.json({message:'unknown error'},{status:404})
    }
   
}