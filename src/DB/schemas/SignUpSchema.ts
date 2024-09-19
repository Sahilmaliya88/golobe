import {z} from 'zod'

const signUpSchema = z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email({message:"please enter valid email"}),
    mobile:z.string().min(10,{message:'please enter valid  mobile number'}),
    password:z.string().min(6,{message:'please enter 6 character'}),
    conformpassword:z.string().min(6,{message:'please enter 6 character'})
})

export default signUpSchema