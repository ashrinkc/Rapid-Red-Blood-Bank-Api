import mongoose, { Schema } from "mongoose";
import User from "./User";


interface IBloodBankData{
    bloodBank:mongoose.Schema.Types.ObjectId,
    name:string,
    type:string,
    quantity:number,
    bloodType:string,
    contact:string
}

const bloodBankDataSchema = new Schema({
    bloodBank:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.OrganizationModel,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['receiver','donor'],
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    bloodType:{
        type:String,
        enum:['A+','B+','A-','B-','O+','O-','AB+','AB-'],
        required:true
    },
    contact:{
        type:String,
    }
},{
    timestamps:true
})

const bloodSchemaModel = mongoose.model<IBloodBankData>('BloodBankData',bloodBankDataSchema)

export default bloodSchemaModel