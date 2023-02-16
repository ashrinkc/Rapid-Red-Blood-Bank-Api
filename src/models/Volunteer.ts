import mongoose, { mongo, Schema } from "mongoose";
import eventModel from "./Events";
import User from "./User";


interface IVolunteer{
    volunteerId:mongoose.Schema.Types.ObjectId,
    eventId:mongoose.Schema.Types.ObjectId,
    organizationId:mongoose.Schema.Types.ObjectId,
    age:string,
    address:string,
    gender:string,
    nationality:string,
    skillSet:string,
    training:string,
    status:string
}

const volunteerSchema = new Schema({
    volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.DonorModel
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:eventModel
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.OrganizationModel
    },
    age:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    nationality:{
        type:String
    },
    skillSet:{
        type:String
    },
    training:{
        type:String
    },
    status:{
        type:String,
        default:"pending",
        enum:['pending','approved','rejected']
    }
},{
    timestamps:true
})

const volunteerModel = mongoose.model<IVolunteer>('Volunteer',volunteerSchema)

export default volunteerModel