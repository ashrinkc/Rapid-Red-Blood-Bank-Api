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
    }
},{
    timestamps:true
})

const PatientRequestModel = mongoose.model<IPatientRequest>('PatientBloodRequest',patientBloodRequestSchema)

export default PatientRequestModel