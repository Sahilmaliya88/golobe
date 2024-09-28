import { connectToDatabase } from "@/DB/connectDb";
import UserModel from "@/DB/models/userModel";
import { redis } from "@/DB/Redis";
import { NextRequest, NextResponse } from "next/server";
import { typeUser } from './../../../../../DB/models/userModel';
import { user } from "@/types/auth";
interface  content{
    params:{
        email:string
    }
}
export async function GET(req:NextRequest,content:content){
    try{
          //check in redis
    const  ruser:user | null = await redis.get(`auth-${content.params.email}`)
    if(ruser){
        return NextResponse.json({user:ruser},{status:201})
    }else{
        //database check
        await connectToDatabase()
        const duser:typeUser | null = await UserModel.findOne({email:content.params.email})
        if(duser){
            await redis.set(`auth-${duser.email}`,JSON.stringify(duser));
            await redis.expire(`auth-${duser.email}`,24*60*60)
            return NextResponse.json({user:duser},{status:201})
        }else{
            return NextResponse.json({message:"user not fount"},{status:404})
        }

    }
    }catch(err){
        console.error(err)
    }
  
}