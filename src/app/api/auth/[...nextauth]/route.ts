import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { connectToDatabase } from '@/DB/connectDb'
import UserModel from '@/DB/models/userModel'
import { typeUser } from '@/DB/models/userModel';
const authoptions:AuthOptions = {
    //provider's array
    providers:[
        GoogleProvider({
            clientId:process.env.google_clientId || '',
            clientSecret:process.env.google_clientsecret || '',
        }),
        FacebookProvider({
            clientId:process.env.facebook_Id || '',
            clientSecret:process.env.facebook_secret || ''
        })
    ],
    //secret for  jwt token

    secret:process.env.nextSecret,
    //session strategy
    session:{
        strategy:"jwt",
        maxAge:30*24*60*60
    },
    //callback functions
    callbacks:{
        async signIn({user,account}):Promise<boolean | string>{
            try{
                await connectToDatabase()
                //check is 
                let userExist:typeUser | null = await UserModel.findOne({email:user.email})
                if(userExist){
                    if(userExist.provider !== account?.provider){
                        throw new Error("this email logged in with another provide")
                    }
                }
                if(!userExist){
                        userExist = new UserModel({
                        firstname:user.name?.split(' ')[0],
                        lastname:user.name?.split(' ')[1],
                        email:user.email,
                        photo:user.image,
                        provider:account?.provider,
                        providerId:account?.userId,
                        password:user.id,
                        conformpassword:user.id
                    })
                    await userExist?.save({validateBeforeSave:false})
                }
                return true
            }catch(err){
                console.log(err)
                return false
            }
           
        },
        async jwt({token}) {
            return token
        },
    }
}
 const handler = NextAuth(authoptions)
 export {handler as GET,handler as POST}