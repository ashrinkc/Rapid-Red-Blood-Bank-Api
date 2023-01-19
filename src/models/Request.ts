import mongoose, { mongo, Schema } from "mongoose";
import { StringDecoder } from "string_decoder";
import User from "./User";

interface Request{
    donorId: mongoose.Schema.Types.ObjectId
    organizationId: mongoose.Schema.Types.ObjectId 
    medicalHistory:string
    donationHistory:string
    age:string
    gender:string
    status:string
}

const requestSchema = new Schema({
    donorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User.DonorModel
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User.OrganizationModel
    },
    medicalHistory:{
        type:String
    },
    donationHistory:{
        type:String
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending', 'approved', 'rejected']
    }
})

const requestModel = mongoose.model<Request>('Request',requestSchema)

export default requestModel