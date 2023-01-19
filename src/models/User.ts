import mongoose, {model,Schema} from 'mongoose'

interface User{
    email:string,
    name:string,
    password:string,
    userType:string,
    bloodType:string,
    contact:string
}

interface Donor extends User{
    bloodType:string
}

interface Organization extends User{
    address: string,
    status: string,
}

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:['donor','patient','organization']
    },
    contact:{
        type:String
    }
}, { 
    discriminatorKey: 'userType',
    timestamps: true 
},)

const UserModel = mongoose.model<User>('User',userSchema)
const DonorModel = UserModel.discriminator<Donor>('donor',new Schema({
    bloodType:{
        type:String,
        required:true
    }
}))

const OrganizationModel = UserModel.discriminator<Organization>('organization',new Schema({
    donorId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'open',
        enum:['open','pending','rejected']
    }
}))

export default {UserModel,DonorModel,OrganizationModel}