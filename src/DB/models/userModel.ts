import mongoose,{Schema,Document} from "mongoose";
import isEmail from 'validator/lib/isEmail'
import * as bcrypt from 'bcrypt'
export interface typeUser extends Document{
    email:string,
    mobile:string,
    password:string,
    conformpassword:string | undefined,
    photo:string,
    firstname:string,
    lastname:string,
    // location:Schema.Types.ObjectId[],
    role:string,
    otp:string,
    otpexpire:Schema.Types.Date,
    provider:string,
    providerId:string,
    isActive:boolean,
    photoid:string,
}
const userSchema:Schema<typeUser> = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please provide your email'],
        trim:true,
        unique:true,
        validate:{
            validator:function(v){
                return isEmail(v)
            },
            message:'please enter valid email'
        }
    },
    mobile:{
        type:String,
        maxlength:[10,'please enter 10 digits'],
        unique:true
    },
    firstname:{
        type:String,
        required:[true,'please Enter firstname']
    },
    lastname:{
        type:String,
        require:[true,'please enter lastname']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'please enter 6 characters'],
        select:false
    },
    conformpassword:{
        type:String,
        validate:{
            validator:function(conformpassword){
                return conformpassword===this.password
            },
            message:'please enter same password'
        }
    },
    photo:{
        type:String,
        default:"https://res.cloudinary.com/dh0ekblp9/image/upload/v1726506098/golobe/mjezuwckztzdzmp7t12p.jpg"
    },
    //will declare location after defining model,
    role:{
        type:String,
        default:'user',
        enum:['user','admin','hotel','travel','guide']
    },
    photoid:String,
    provider:String,
    providerId:String,
    otp:{
        type:String,
        select:false
    },
    otpexpire:{
        type:Date,
        select:false
    },
    isActive:{
        type:Boolean,
        default:true,
        select:false
    },

},{toObject:{virtuals:true},toJSON:{virtuals:true}}) 
userSchema.index({email:1},{unique:true})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
    this.conformpassword = undefined
    next()
})
userSchema.pre('find',function(next){
        this.where({isActive:{$ne:false}})
        next()
})
const UserModel = mongoose.models.userModel || mongoose.model("userModel",userSchema)
export default UserModel