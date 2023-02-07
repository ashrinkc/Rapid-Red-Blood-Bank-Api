import mongoose, { Schema } from "mongoose";
import User from "./User";

interface IFeedback{
    donorId:mongoose.Schema.Types.ObjectId
    patientId:mongoose.Schema.Types.ObjectId
    organizationId:mongoose.Schema.Types.ObjectId
    rating:number
    feedback:string
}

const feedbackSchema = new Schema({
    donorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.DonorModel
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.PatientModel
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.OrganizationModel
    },
    rating:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const feedbackModel = mongoose.model<IFeedback>('Feedback',feedbackSchema)

export default feedbackModel