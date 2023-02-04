import mongoose, { Schema } from "mongoose"

interface IAdmin{
    username:string,
    password:string
}

const AdminSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const AdminModel = mongoose.model<IAdmin>('Admin',AdminSchema)

export default AdminModel