import { Router } from "express";
import { addEvents, eventVolunteer, getAllEvents } from "../controllers/eventController";

const eventRoute = Router()

eventRoute.post('/',addEvents)
eventRoute.get('/',getAllEvents)
eventRoute.post('/volunteer/:id',eventVolunteer)
export default eventRoute