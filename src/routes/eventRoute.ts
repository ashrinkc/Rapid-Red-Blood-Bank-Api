import { Router } from "express";
import { addEvents, getAllEvents } from "../controllers/eventController";

const eventRoute = Router()

eventRoute.post('/',addEvents)
eventRoute.get('/',getAllEvents)

export default eventRoute