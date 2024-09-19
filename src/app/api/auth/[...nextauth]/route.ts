import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
const authoptions:AuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.google_clientId || '',
            clientSecret:process.env.google_clientsecret || '',
        })
    ],
}
 const handler = NextAuth(authoptions)
 export {handler as GET,handler as POST}