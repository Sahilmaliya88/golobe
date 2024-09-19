import { connectToDatabase } from "@/DB/connectDb";
import { redis } from "@/DB/Redis";
import { NextRequest, NextResponse } from "next/server";
import UserModel from './../../../../DB/models/userModel';
import jwt from 'jsonwebtoken'
export async function POST(req:NextRequest):Promise<NextResponse>{
    try{
          //database connection
          const data = await req.json()
        await connectToDatabase()
        //user creation
        const user =  await UserModel.create(data);
        //jwt token create
        const token:string = jwt.sign({id:user._id},process.env.jwtsecret || 'nothing',{
            expiresIn:"30d"
        })
        //redis key add
            await redis.set(`user:-${user._id}`,JSON.stringify(user))
            await redis.expire(`$user:-${user._id}`,24*60*60*1000)
        //resposne 
        const response =  NextResponse.json({message:"success",user:user},{status:201})  
        response.cookies.set("jwt",token,{httpOnly:true,expires:new Date(Date.now()+30*24*60*60)})
        return response
    }catch(err){
        return NextResponse.json({message:'unknown error'},{status:500})
    }
}