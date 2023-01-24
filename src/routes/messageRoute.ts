import { Router } from "express";
import { getMessage, newMessage } from "../controllers/messageController";

const messageRoute = Router()

messageRoute.post('/',newMessage)
messageRoute.get('/:conversationId',getMessage)

export default messageRoute