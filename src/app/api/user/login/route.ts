import { connectToDatabase } from "@/DB/connectDb";
import UserModel, { typeUser } from "@/DB/models/userModel";
import { redis } from "@/DB/Redis";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';
export async function POST(req:NextRequest){
    try{
        //email and passowrd from req
        const data = await req.json()
        const {email,password,remember} = data
        console.log(email)
        if(!email && !password){
            throw new Error("please provide all details")
        }
        await connectToDatabase()
        //find user
        const user:typeUser = await UserModel.findOne({email:email}).select("+password")
        if(user.provider){
            throw new Error("you are already logged in with another provider")
        }
        //password compare
        const compare = await bcrypt.compare(password,user.password)
        if(!compare){
            throw new Error("Invalid password!")
        }
       
        //response
        const response = NextResponse.json({status:'success',user:user})
         
        if(remember){
            const token = jwt.sign({id:user.id},process.env.jwtsecret || 'nothing',{
                expiresIn:"30d"
            })
             //cache user for one day
            await redis.set(`user:-${user.id}`,JSON.stringify(user))
            await redis.expire(`user:-${user.id}`,24*60*60)
            //cookie
            response.cookies.set("jwt",token,{
                httpOnly:true,
                expires:new Date(Date.now()+30*24*60*60*1000)
            })
        }
       
        return response
    }catch(err){
        return NextResponse.json({message:'unknown error'},{status:500})
    }
}