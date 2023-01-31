import mongoose, { Schema } from "mongoose";
import User from "./User";

export interface IEvent{
    organizationId: mongoose.Schema.Types.ObjectId,
    eventName:string,
    eventLocation:string,
    eventOrganizer:string,
    eventDescription:string,
    eventTime:Date
}

const eventSchema = new Schema({
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User.OrganizationModel,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    eventLocation:{
        type:String,
        required:true
    },
    eventOrganizer:{
        type:String
    },
    eventDescription:{
        type:String,
        required:true
    },
    eventTime:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const eventModel = mongoose.model<IEvent>('Event',eventSchema)

export default eventModel