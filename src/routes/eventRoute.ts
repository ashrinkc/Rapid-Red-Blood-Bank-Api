import { Router } from "express";
import { addEvents, eventVolunteer, getAllEvents, getEventsById, getEventVolunteer } from "../controllers/eventController";

const eventRoute = Router()

eventRoute.post('/',addEvents)
eventRoute.get('/',getAllEvents)
eventRoute.post('/volunteer/:id',eventVolunteer)
eventRoute.get('/:id',getEventsById)
eventRoute.get('/volunteer/:id',getEventVolunteer)
export default eventRoute