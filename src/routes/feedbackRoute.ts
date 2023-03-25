import { Router } from "express";
import { userFeedback, getAllFeedback, sendMail } from "../controllers/feedbackController";

const feedbackRoute = Router()

feedbackRoute.post('/',userFeedback)
feedbackRoute.get('/',getAllFeedback)
feedbackRoute.post('/contact',sendMail)
export default feedbackRoute