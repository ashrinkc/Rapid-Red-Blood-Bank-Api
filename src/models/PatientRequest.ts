import mongoose, { Schema } from "mongoose";
import User from "./User";

interface IPatientRequest{
    patientId:mongoose.Schema.Types.ObjectId
    donorId:mongoose.Schema.Types.ObjectId
    organizationId:mongoose.Schema.Types.ObjectId
    bloodType:string
    gender:string
    age:string
    about:string
    status:string
    orgStatus:string
}

const patientBloodRequestSchema = new Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.PatientModel
    },
    donorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.DonorModel
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.OrganizationModel
    },
    bloodType:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        enum:['open','pending','approved','rejected']
    },
     orgStatus:{
        type:String,
        default:'pending',
        enum:['pending', 'approved', 'rejected']
    }
},{
    timestamps:true
})

const PatientRequestModel = mongoose.model<IPatientRequest>('PatientBloodRequest',patientBloodRequestSchema)

export default PatientRequestModel