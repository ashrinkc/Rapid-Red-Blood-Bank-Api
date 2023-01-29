import mongoose, { Schema } from "mongoose";

interface Event{
    organizationId: mongoose.Schema.Types.ObjectId,
    eventName:string,
    eventLocation:string,
    eventOrganizer:string,
    eventDescription:string
}

const eventSchema = new Schema({
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
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
    }
},{
    timestamps:true
})

const eventModel = mongoose.model<Event>('Event',eventSchema)

export default eventModel