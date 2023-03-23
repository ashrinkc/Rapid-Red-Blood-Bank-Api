import { Router } from "express";
import { userFeedback, getAllFeedback } from "../controllers/feedbackController";

const feedbackRoute = Router()

feedbackRoute.post('/',userFeedback)
feedbackRoute.get('/',getAllFeedback)
export default feedbackRoute