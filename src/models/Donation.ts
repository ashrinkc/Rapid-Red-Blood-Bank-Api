import mongoose, { Schema } from "mongoose";
import User from "./User";

interface IDonation{
    requestedAmount:number,
    purpose:string
    donatedAmount:number,
    recipient:mongoose.Schema.Types.ObjectId,
    donors:[]
}

const donationSchema = new Schema({
    requestedAmount:{
        type:Number,
        required:true
    },
    purpose:{
        type:String
    },
    donatedAmount:{
        type:Number,
        default:0
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.PatientModel
    },
    donors:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:User.DonorModel
            },
            amount:{
                type:Number,
                required:true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        }
    ]
})

const donationModel = mongoose.model<IDonation>('Donation',donationSchema)

export default donationModel
