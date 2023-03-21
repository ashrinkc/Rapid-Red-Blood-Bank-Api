import mongoose, { Schema } from "mongoose";
import User from "./User";

interface IDonation{
    title:string
    requestedAmount:number,
    purpose:string
    donatedAmount:number,
    recipient:mongoose.Schema.Types.ObjectId,
    img:{},
    donors:[],
    donationTime:Date
}

const donationSchema = new Schema({
    title:{
        type:String,
        required:true
    },
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
    donationTime:{
        type:Date,
        // required:true
    },
    img:{
        public_id:{
            type:String,
        },
        url:{
            type:String
        }
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
},{
    timestamps:true
})

const donationModel = mongoose.model<IDonation>('Donation',donationSchema)

export default donationModel
