import mongoose,{mongo,Schema} from 'mongoose'

interface Conversation{
    member:[]
}

const conversationSchema = new Schema({
    member:{
        type:Array
    }
},{
    timestamps:true
})

const conversationModel = mongoose.model<Conversation>('Conversation',conversationSchema)

export default conversationModel