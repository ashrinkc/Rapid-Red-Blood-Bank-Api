import mongoose,{mongo,Schema} from 'mongoose'

interface Message{
    conversationId:string,
    sender:string,
    text:string
}

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

const messageModel = mongoose.model<Message>('Message',messageSchema)

export default messageModel