import { Router } from "express";
import { userFeedback } from "../controllers/feedbackController";

const feedbackRoute = Router()

feedbackRoute.post('/',userFeedback)

export default feedbackRoute