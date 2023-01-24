import { Router } from "express";
import { getConversation, newConversation } from "../controllers/conversationController";

const conversationRoute = Router()

conversationRoute.post('/',newConversation)
conversationRoute.get('/:userId',getConversation)

export default conversationRoute