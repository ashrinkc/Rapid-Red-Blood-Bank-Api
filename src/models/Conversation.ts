import mongoose,{mongo,Schema} from 'mongoose'


const conversationSchema = new Schema({
    member:{
        type:Array
    }
},{
    timestamps:true
})

const conversationModel = mongoose.model('Conversation',conversationSchema)

export default conversationModel