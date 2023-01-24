import mongoose,{mongo,Schema} from 'mongoose'


const messageSchema = new Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
})

const messageModel = mongoose.model('Message',messageSchema)

export default messageModel