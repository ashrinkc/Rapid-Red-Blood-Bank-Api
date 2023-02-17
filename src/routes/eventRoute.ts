import { Router } from "express";
import { acceptVolunteer, addEvents, eventVolunteer, getAllEvents, getEventsById, getEventVolunteer, rejectVolunteer } from "../controllers/eventController";

const eventRoute = Router()

eventRoute.post('/',addEvents)
eventRoute.get('/',getAllEvents)
eventRoute.post('/volunteer/:id',eventVolunteer)
eventRoute.get('/:id',getEventsById)
eventRoute.get('/volunteer/:id',getEventVolunteer)
eventRoute.post('/accepted/:id',acceptVolunteer)
eventRoute.post('/rejected/:id',rejectVolunteer)
export default eventRoute