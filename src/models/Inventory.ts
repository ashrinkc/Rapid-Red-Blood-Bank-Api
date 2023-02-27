import mongoose, { Schema } from "mongoose";
import User from "./User";

export interface Iinventory{
    bloodBank:mongoose.Schema.Types.ObjectId,
    Aplus:number,
    Aminus:number,
    Bplus:number,
    Bminus:number,
    ABplus:number,
    ABminus:number,
    Oplus:number,
    Ominus:number
}

const inventorySchema = new Schema({
    bloodBank:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.OrganizationModel,
        required:true
    },
    Aplus: {
        type: Number,
        default: 0
    },
    Aminus: {
        type: Number,
        default: 0
    },
    Bplus: {
        type: Number,
        default: 0
    },
    Bminus: {
        type: Number,
        default: 0
    },
    ABplus: {
        type: Number,
        default: 0
    },
    ABminus: {
        type: Number,
        default: 0
    },
    Oplus: {
        type: Number,
        default: 0
    },
    Ominus: {
        type: Number,
        default: 0
    }
},{
    timestamps:true
})

const inventoryModel = mongoose.model<Iinventory>('Inventory',inventorySchema)
export default inventoryModel
