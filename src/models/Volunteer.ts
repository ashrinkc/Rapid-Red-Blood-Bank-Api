import mongoose, { mongo, Schema } from "mongoose";
import User from "./User";


interface IVolunteer{
    volunteerId:mongoose.Schema.Types.ObjectId,
    organizationId:mongoose.Schema.Types.ObjectId,
    age:string,
    address:string,
    gender:string,
    nationality:string,
    skillSet:string,
    training:string
}

const volunteerSchema = new Schema({
    volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User.DonorModel
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
    }
},{
    timestamps:true
})

const volunteerModel = mongoose.model<IVolunteer>('Volunteer',volunteerSchema)

export default volunteerModel